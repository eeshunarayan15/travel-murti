import { useState, useEffect } from "react";
import { createPackage, updatePackage } from "./packages.service";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const PackageForm = ({ open, onClose, editing, setPackages }) => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setCategory(editing.category || "");
      setDescription(editing.description || "");
    } else {
      setCategory("");
      setDescription("");
    }
  }, [editing, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }
    setLoading(true);
    try {
      if (editing) {
        await updatePackage(editing._id, {
          category: category.trim(),
          description: description.trim(),
        });
        setPackages((prev) =>
          prev.map((p) =>
            p._id === editing._id
              ? {
                  ...p,
                  category: category.trim(),
                  description: description.trim(),
                }
              : p,
          ),
        );
        toast.success("Package updated");
      } else {
        const res = await createPackage({
          category: category.trim().toUpperCase(),
          description: description.trim(),
        });
        const newPkg = res?.data?.data ?? res?.data ?? res;
        if (newPkg?._id) setPackages((prev) => [...prev, newPkg]);
        toast.success("Package created");
      }
      onClose();
    } catch (err) {
      toast.error(
        err?.message || (editing ? "Update failed" : "Create failed"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Package" : "Add Package"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. SPIRITUAL"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PackageForm;
