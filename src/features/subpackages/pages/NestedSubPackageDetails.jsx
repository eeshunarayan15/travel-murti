import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  fetchNestedSubPackageDetails,
  clearNestedDetails,
  updateSubPackage,
  updateSubPackagePricing,
} from "../../../redux/slices/subPackagesSlice";

import GallerySlider from "../components/GallerySlider";
import SubPackageTabs from "../components/SubPackageTabs";
import PricingTable from "../components/PricingTable";
import EnquiryForm from "../components/EnquiryForm";
import Shimmer from "../components/Shimmer";

const NestedSubPackageDetails = () => {
  // ── ALL hooks at the top, in order ──────────────────────────
  const dispatch = useDispatch();

  const { nestedSubPackageId, nestedSlug, subSlug } = useParams();

  const { currentNestedDetails: data, nestedDetailsStatus } = useSelector(
    (state) => state.subPackages,
  );

  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === "admin";

  // ── Build API id ─────────────────────────────────────────────
  // subSlug    = "chardham-tour-package"  (direct parent slug)
  // nestedSlug = "kedarnath-yatra"        (this page slug)
  // combined   = "chardham-tour-package/kedarnath-yatra"
  // matches backend: GET /:parentSlug/:subSlug → getSubPackageByUrl ✅
  const id =
    nestedSubPackageId ||
    (subSlug && nestedSlug ? `${subSlug}/${nestedSlug}` : nestedSlug);

  // ── Single useEffect — fetch on mount, clear on leave ────────
  useEffect(() => {
    if (id) {
      dispatch(fetchNestedSubPackageDetails(id));
    }
    return () => {
      dispatch(clearNestedDetails());
    };
  }, [dispatch, id]);

  // ── Save handlers ─────────────────────────────────────────────

  const handleSave = async (updatedFields) => {
    const result = await dispatch(
      updateSubPackage({ id, formData: updatedFields }),
    );
    if (updateSubPackage.fulfilled.match(result)) {
      toast.success("Updated successfully");
    } else {
      toast.error("Update failed");
    }
  };

  const handlePricingSave = async (pricingDetails) => {
    const result = await dispatch(
      updateSubPackagePricing({ id, pricingDetails }),
    );
    if (updateSubPackagePricing.fulfilled.match(result)) {
      toast.success("Pricing updated");
    } else {
      toast.error("Pricing update failed");
    }
  };

  // ── Render states ─────────────────────────────────────────────

  if (nestedDetailsStatus === "loading") return <Shimmer />;
  if (!data) return <p className="text-center py-12">Not found</p>;

  // ── Main render ───────────────────────────────────────────────

  return (
    <div>
      {/* Banner */}
      <div
        className="relative w-full h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {data.name}
          </h1>
          <p className="text-sm text-gray-300 mt-1">Home &gt; {data.name}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT — main content */}
          <div className="flex-1 min-w-0">
            <GallerySlider images={data.galleryImages} />
            <SubPackageTabs
              subPackage={data}
              editable={isAdmin}
              onSave={handleSave}
            />
            <PricingTable
              pricing={data.pricingDetails}
              editable={isAdmin}
              onSave={handlePricingSave}
            />
          </div>

          {/* RIGHT — sticky enquiry form */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Enquiry Form
              </h3>
              <EnquiryForm />
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-700">
                  Looking for Help?
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  For Tour Packages, Vehicle Rental, and Customer Care Support
                </p>
                <p className="text-sm text-slate-700 mt-2">📞 +91 8527036496</p>
                <p className="text-sm text-slate-700">
                  ✉️ contact.travelmurti@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestedSubPackageDetails;
