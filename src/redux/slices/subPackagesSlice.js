import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

// ─── THUNKS ──────────────────────────────────────────────────────────────────

export const fetchSubPackages = createAsyncThunk(
  "subPackages/fetchSubPackages",
  async (packageId) => {
    const response = await axiosInstance.get(
      `/subpackages/package/${packageId}`,
    );
    return response.data?.data ?? response.data;
  },
);

// used by SubPackageDetails page
export const fetchSubPackageDetails = createAsyncThunk(
  "subPackages/fetchSubPackageDetails",
  async (subPackageId) => {
    const response = await axiosInstance.get(`/subpackages/${subPackageId}`);
    const subPackageData = response.data?.data ?? response.data;

    // fetch related subpackages if they exist
    if (subPackageData.subPackages && subPackageData.subPackages.length > 0) {
      const relatedSubPackagesPromises = subPackageData.subPackages.map(
        async (id) => {
          const relatedResponse = await axiosInstance.get(`/subpackages/${id}`);
          return relatedResponse.data?.data ?? relatedResponse.data;
        },
      );
      subPackageData.relatedSubPackages = await Promise.all(
        relatedSubPackagesPromises,
      );
    } else {
      subPackageData.relatedSubPackages = [];
    }

    return subPackageData;
  },
);

// used by NestedSubPackageDetails page — separate thunk, separate state
export const fetchNestedSubPackageDetails = createAsyncThunk(
  "subPackages/fetchNestedSubPackageDetails",
  async (id) => {
    const response = await axiosInstance.get(`/subpackages/${id}`);
    return response.data?.data ?? response.data;
  },
);

export const createSubPackage = createAsyncThunk(
  "subPackages/createSubPackage",
  async ({ formData, pricingDetails }, { rejectWithValue }) => {
    try {
      if (pricingDetails?.length) {
        formData.append("pricingDetails", JSON.stringify(pricingDetails));
      }
      const response = await axiosInstance.post("/subpackages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data?.data ?? response.data;
    } catch (err) {
      toast.error("Failed creating the subpackage");
      return rejectWithValue(err.response?.data);
    }
  },
);

export const updateSubPackage = createAsyncThunk(
  "subPackages/updateSubPackage",
  async ({ id, formData, pricingDetails }) => {
    if (pricingDetails?.length) {
      formData.append("pricingDetails", JSON.stringify(pricingDetails));
    }
    const response = await axiosInstance.put(`/subpackages/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data?.data ?? response.data;
  },
);

export const updateSubPackagePricing = createAsyncThunk(
  "subPackages/updatePricing",
  async ({ id, pricingDetails }) => {
    const response = await axiosInstance.put(`/subpackages/${id}`, {
      pricingDetails,
    });
    return response.data?.data ?? response.data;
  },
);

export const deleteGalleryImage = createAsyncThunk(
  "subPackages/deleteGalleryImage",
  async ({ subPackageId, imageId }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/subpackages/${subPackageId}/gallery-images/${imageId}`,
      );
      return { subPackageId, imageId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete image",
      );
    }
  },
);

// ─── SLICE ───────────────────────────────────────────────────────────────────

const subPackagesSlice = createSlice({
  name: "subPackages",
  initialState: {
    data: [],

    // SubPackageDetails page state
    currentDetails: null,
    detailsStatus: "idle",

    // NestedSubPackageDetails page state — separate so they don't clash
    currentNestedDetails: null,
    nestedDetailsStatus: "idle",

    status: "idle",
    error: null,
  },
  reducers: {
    // call this when leaving SubPackageDetails so stale data doesn't show
    clearCurrentDetails(state) {
      state.currentDetails = null;
      state.detailsStatus = "idle";
    },
    // call this when leaving NestedSubPackageDetails
    clearNestedDetails(state) {
      state.currentNestedDetails = null;
      state.nestedDetailsStatus = "idle";
    },
  },
  extraReducers(builder) {
    builder
      // ── fetchSubPackages ──
      .addCase(fetchSubPackages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSubPackages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ── fetchSubPackageDetails (SubPackageDetails page) ──
      .addCase(fetchSubPackageDetails.pending, (state) => {
        state.detailsStatus = "loading";
        state.currentDetails = null; // clear stale data immediately
      })
      .addCase(fetchSubPackageDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.currentDetails = action.payload;
      })
      .addCase(fetchSubPackageDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.error.message;
      })

      // ── fetchNestedSubPackageDetails (NestedSubPackageDetails page) ──
      .addCase(fetchNestedSubPackageDetails.pending, (state) => {
        state.nestedDetailsStatus = "loading";
        state.currentNestedDetails = null; // clear stale data immediately
      })
      .addCase(fetchNestedSubPackageDetails.fulfilled, (state, action) => {
        state.nestedDetailsStatus = "succeeded";
        state.currentNestedDetails = action.payload;
      })
      .addCase(fetchNestedSubPackageDetails.rejected, (state, action) => {
        state.nestedDetailsStatus = "failed";
        state.error = action.error.message;
      })

      // ── createSubPackage ──
      .addCase(createSubPackage.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // ── updateSubPackage ──
      .addCase(updateSubPackage.fulfilled, (state, action) => {
        state.currentDetails = action.payload;
      })

      // ── deleteGalleryImage ──
      .addCase(deleteGalleryImage.fulfilled, (state, action) => {
        if (state.currentDetails?._id === action.payload.subPackageId) {
          state.currentDetails.galleryImages =
            state.currentDetails.galleryImages.filter(
              (img) => img._id !== action.payload.imageId,
            );
        }
      })

      // ── updateSubPackagePricing ──
      .addCase(updateSubPackagePricing.fulfilled, (state, action) => {
        state.currentDetails = action.payload;
      });
  },
});

export const { clearCurrentDetails, clearNestedDetails } =
  subPackagesSlice.actions;
export default subPackagesSlice.reducer;
