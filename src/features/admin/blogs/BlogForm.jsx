import { useState, useEffect } from "react";
import { createBlog, updateBlog } from "../../../services/blog.service";
import { toast } from "react-hot-toast";

const BlogForm = ({ editing, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "Travel Murti",
    isPublished: false,
    tags: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || "",
        excerpt: editing.excerpt || "",
        content: editing.content || "",
        coverImage: editing.coverImage || "",
        author: editing.author || "Travel Murti",
        isPublished: editing.isPublished || false,
        tags: (editing.tags || []).join(", "),
      });
    } else {
      setForm({
        title: "",
        excerpt: "",
        content: "",
        coverImage: "",
        author: "Travel Murti",
        isPublished: false,
        tags: "",
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      };
      if (editing) {
        await updateBlog(editing._id, payload);
        toast.success("Blog updated");
      } else {
        await createBlog(payload);
        toast.success("Blog created");
      }
      onSuccess?.();
    } catch {
      toast.error(editing ? "Update failed" : "Create failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        {editing ? "Edit Blog" : "Create Blog"}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={8}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover Image URL</label>
          <input
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="travel, india, spiritual"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
            id="isPublished"
          />
          <label htmlFor="isPublished">Publish</label>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          {editing ? "Update" : "Create"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BlogForm;
