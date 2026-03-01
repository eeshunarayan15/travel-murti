import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateSubPackage, deleteGalleryImage,createSubPackage} from "../../redux/slices/subPackagesSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";


const DEFAULT_FORM = {
  name: "",
  description: "",
  price: "",
  duration: "",
  introduction: "",
  tourPlan: "",
  includeExclude: "",
  isDealOfTheDay: false,
  order: 0,
  pricingDetails: [],
};

const SubPackageSlideOver = ({
  open,
  onClose,
  editing,
  parentId,
  parentType,
  onSaved,
}) => {
    const dispatch = useDispatch();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || "",
        description: editing.description || "",
        price: editing.price ?? "",
        duration: editing.duration || "",
        introduction: editing.introduction || "",
        tourPlan: editing.tourPlan || "",
        includeExclude: editing.includeExclude || "",
        isDealOfTheDay: editing.isDealOfTheDay || false,
        order: editing.order || 0,
        pricingDetails: editing.pricingDetails || [],
      });
    } else {
      setForm(DEFAULT_FORM);
      setMainImage(null);
      setGalleryImages([]);
    }
  }, [editing, open]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const addPricingRow = () =>
    set("pricingDetails", [
      ...form.pricingDetails,
      { noOfPax: "", cab: "", costPerPax: "", currency: "INR" },
    ]);

  const updatePricingRow = (index, field, value) => {
    const updated = [...form.pricingDetails];
    updated[index] = { ...updated[index], [field]: value };
    set("pricingDetails", updated);
  };

  const removePricingRow = (index) => {
    set(
      "pricingDetails",
      form.pricingDetails.filter((_, i) => i !== index),
    );
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name.trim()) return toast.error("Name is required");
//     if (!form.description.trim()) return toast.error("Description is required");
//     if (!form.duration.trim()) return toast.error("Duration is required");
//     if (!editing && !mainImage) return toast.error("Main image is required");

//     setLoading(true);
//     try {
//     //   const fd = new FormData();
//     //   fd.append("name", form.name.trim());
//     //   fd.append("description", form.description.trim());
//     //   fd.append("duration", form.duration.trim());
//     //   fd.append("isDealOfTheDay", form.isDealOfTheDay);
//     //   fd.append("order", form.order);
//     //   if (form.price !== "") fd.append("price", form.price);
//     //   if (form.introduction) fd.append("introduction", form.introduction);
//     //   if (form.tourPlan) fd.append("tourPlan", form.tourPlan);
//     //   if (form.includeExclude) fd.append("includeExclude", form.includeExclude);
//     //   if (form.pricingDetails.length)
//     //     fd.append("pricingDetails", JSON.stringify(form.pricingDetails));

//     //   if (!editing) {
//     //     fd.append("parentId", parentId);
//     //     fd.append("parentType", parentType);
//     //   }

//     //   if (mainImage) fd.append("mainImage", mainImage);
//     //   galleryImages.forEach((img) => fd.append("galleryImages", img));

//     //   let saved;
//     //   if (editing) {
//     //     const res = await updateSubPackage(editing._id, fd);
//     //     saved = res?.data?.data ?? res?.data;
//     //     toast.success("Sub-package updated");
//     //   } else {
//     //     const res = await createSubPackage(fd);
//     //     saved = res?.data?.data ?? res?.data;
//     //     toast.success("Sub-package created");
//     //   }

//     //   onSaved(saved, !!editing);
//         //   onClose();
//         let saved;
//         if (editing) {
//           const result = await dispatch(
//             updateSubPackage({
//               id: editing._id,
//               formData: fd,
//               pricingDetails: form.pricingDetails,
//             }),
//           ).unwrap();
//           saved = result;
//           toast.success("Sub-package updated");
//         } else {
//           const result = await dispatch(
//             createSubPackage({
//               formData: fd,
//               pricingDetails: form.pricingDetails,
//             }),
//           ).unwrap();
//           saved = result;
//           toast.success("Sub-package created");
//         }
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || err?.message || "Something went wrong",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!form.name.trim()) return toast.error("Name is required");
      if (!form.description.trim())
        return toast.error("Description is required");
      if (!form.duration.trim()) return toast.error("Duration is required");
      if (!editing && !mainImage) return toast.error("Main image is required");
if (!editing && !parentId) {
  return toast.error("Parent not selected. Please close and try again.");
}
      setLoading(true);
      try {
        // ✅ Build FormData (WITHOUT pricingDetails)
        const fd = new FormData();
        // Add before fd.append
        console.log("parentId on submit:", parentId);
        console.log("parentType on submit:", parentType);
        fd.append("name", form.name.trim());
        fd.append("description", form.description.trim());
        fd.append("duration", form.duration.trim());
        fd.append("isDealOfTheDay", form.isDealOfTheDay);
        fd.append("order", form.order);
        if (form.price !== "") fd.append("price", form.price);
        if (form.introduction) fd.append("introduction", form.introduction);
        if (form.tourPlan) fd.append("tourPlan", form.tourPlan);
        if (form.includeExclude)
          fd.append("includeExclude", form.includeExclude);

        if (!editing) {
          fd.append("parentId", parentId);
          fd.append("parentType", parentType);
        }

        if (mainImage) fd.append("mainImage", mainImage);
        galleryImages.forEach((img) => fd.append("galleryImages", img));

        // ✅ Dispatch Redux thunk
        let saved;
        if (editing) {
          saved = await dispatch(
            updateSubPackage({
              id: editing._id,
              formData: fd,
              pricingDetails: form.pricingDetails,
            }),
          ).unwrap();
          toast.success("Sub-package updated");
        } else {
          saved = await dispatch(
            createSubPackage({
              formData: fd,
              pricingDetails: form.pricingDetails,
            }),
          ).unwrap();
          toast.success("Sub-package created");
        }

        // ✅ Close and refresh
        onSaved(saved, !!editing);
        onClose();
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {editing ? "Edit Sub-Package" : "Add Sub-Package"}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {editing
                ? "Update the details below"
                : `Adding under ${parentType?.toLowerCase()}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-6"
        >
          {/* BASIC INFO */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Basic Info
            </h3>
            <div className="space-y-1.5">
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Kedarnath Yatra"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description *</Label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Brief description..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Duration *</Label>
                <Input
                  value={form.duration}
                  onChange={(e) => set("duration", e.target.value)}
                  placeholder="e.g. 5 Days / 4 Nights"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Order</Label>
                <Input
                  type="number"
                  value={form.order}
                  onChange={(e) => set("order", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="dealOfTheDay"
                  checked={form.isDealOfTheDay}
                  onChange={(e) => set("isDealOfTheDay", e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <Label htmlFor="dealOfTheDay">Deal of the Day</Label>
              </div>
            </div>
          </section>

          {/* IMAGES */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Images
            </h3>

            {/* MAIN IMAGE */}
            <div className="space-y-1.5">
              <Label>Main Image {!editing && "*"}</Label>
              {editing?.imageUrl && !mainImage && (
                <div className="relative w-32 h-20 mb-2 group">
                  <img
                    src={editing.imageUrl}
                    alt="current"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <div
                    className="absolute inset-0 bg-black/40 rounded-lg opacity-0 
          group-hover:opacity-100 transition flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-medium">
                      Current
                    </span>
                  </div>
                </div>
              )}
              {mainImage && (
                <div className="relative w-32 h-20 mb-2 group">
                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt="new"
                    className="w-full h-full object-cover rounded-lg border-2 border-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setMainImage(null)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full 
            text-white flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span
                    className="absolute bottom-1 left-1 text-xs bg-blue-500 
          text-white px-1.5 py-0.5 rounded font-medium"
                  >
                    New
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMainImage(e.target.files[0])}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 
        file:rounded-lg file:border-0 file:text-sm file:font-medium 
        file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* GALLERY IMAGES */}
            <div className="space-y-2">
              <Label>Gallery Images (max 10)</Label>

              {/* Existing gallery images — show only when editing */}
              {editing?.galleryImages?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 font-medium">
                    Existing ({editing.galleryImages.length})
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {editing.galleryImages.map((img) => (
                      <div
                        key={img._id}
                        className="relative group aspect-square"
                      >
                        <img
                          src={img.url}
                          alt="gallery"
                          className="w-full h-full object-cover rounded-lg border border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (!window.confirm("Delete this image?")) return;
                            try {
                              await dispatch(
                                deleteGalleryImage({
                                  subPackageId: editing._id,
                                  imageId: img._id,
                                }),
                              ).unwrap();
                              // Update local editing object to re-render
                              editing.galleryImages =
                                editing.galleryImages.filter(
                                  (i) => i._id !== img._id,
                                );
                              setForm((f) => ({ ...f }));
                              toast.success("Image deleted");
                            } catch (err) {
                              toast.error(err || "Failed to delete image");
                            }
                          }}
                          className="absolute inset-0 bg-black/50 rounded-lg opacity-0 
                  group-hover:opacity-100 transition flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New gallery images to upload */}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setGalleryImages(Array.from(e.target.files))}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 
        file:rounded-lg file:border-0 file:text-sm file:font-medium 
        file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
              />

              {/* Preview newly selected gallery images */}
              {galleryImages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 font-medium">
                    New to upload ({galleryImages.length})
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {galleryImages.map((file, i) => (
                      <div key={i} className="relative group aspect-square">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`new-${i}`}
                          className="w-full h-full object-cover rounded-lg border-2 border-blue-300"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryImages(
                              galleryImages.filter((_, idx) => idx !== i),
                            )
                          }
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 
                  rounded-full text-white flex items-center justify-center 
                  hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span
                          className="absolute bottom-1 left-1 text-xs bg-blue-500 
                text-white px-1 py-0.5 rounded font-medium"
                        >
                          New
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CONTENT */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Content
            </h3>
            {[
              { field: "introduction", label: "Introduction" },
              { field: "tourPlan", label: "Tour Plan" },
              { field: "includeExclude", label: "Include / Exclude" },
            ].map(({ field, label }) => (
              <div key={field} className="space-y-1.5">
                <Label>{label}</Label>
                <textarea
                  value={form[field]}
                  onChange={(e) => set(field, e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}...`}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            ))}
          </section>

          {/* PRICING TABLE */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Pricing Details
              </h3>
              <button
                type="button"
                onClick={addPricingRow}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" /> Add Row
              </button>
            </div>
            {form.pricingDetails.length === 0 ? (
              <p className="text-sm text-slate-400">No pricing rows yet.</p>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2 text-xs font-medium text-slate-500 px-1">
                  <span>No. of Pax</span>
                  <span>Cab</span>
                  <span>Cost/Pax</span>
                  <span>Currency</span>
                </div>
                {form.pricingDetails.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 items-center">
                    <Input
                      type="number"
                      value={row.noOfPax}
                      onChange={(e) =>
                        updatePricingRow(i, "noOfPax", e.target.value)
                      }
                      placeholder="2"
                    />
                    <Input
                      value={row.cab}
                      onChange={(e) =>
                        updatePricingRow(i, "cab", e.target.value)
                      }
                      placeholder="Sedan"
                    />
                    <Input
                      type="number"
                      value={row.costPerPax}
                      onChange={(e) =>
                        updatePricingRow(i, "costPerPax", e.target.value)
                      }
                      placeholder="5000"
                    />
                    <div className="flex items-center gap-1">
                      <Input
                        value={row.currency}
                        onChange={(e) =>
                          updatePricingRow(i, "currency", e.target.value)
                        }
                        placeholder="INR"
                      />
                      <button
                        type="button"
                        onClick={() => removePricingRow(i)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 shrink-0">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : editing ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SubPackageSlideOver;
