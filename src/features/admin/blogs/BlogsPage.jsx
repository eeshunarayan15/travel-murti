import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getBlogs, deleteBlog } from "../../../services/blog.service";
import BlogForm from "./BlogForm";
import { FiFileText, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    setLoading(true);
    getBlogs(false)
      .then(setBlogs)
      .catch(() => toast.error("Failed to load blogs"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await deleteBlog(id);
      setBlogs((b) => b.filter((x) => x._id !== id));
      toast.success("Blog deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSuccess = () => {
    fetchBlogs();
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-slate-600">Create and manage blog posts for the website.</p>
        <button
          type="button"
          onClick={() => { setShowForm(true); setEditing(null); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <FiPlus className="w-4 h-4" /> New Blog
        </button>
      </div>

      {(showForm || editing) && (
        <BlogForm
          editing={editing}
          onSuccess={handleSuccess}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Blogs</h2>
          <p className="text-sm text-slate-500 mt-0.5">{blogs.length} post(s)</p>
        </div>
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FiFileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No blogs yet. Click &quot;New Blog&quot; to add one.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {blogs.map((blog) => (
              <li key={blog._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-slate-50">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-800 truncate">{blog.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {blog.isPublished ? "Published" : "Draft"} · {blog.author}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => { setEditing(blog); setShowForm(false); }}
                    className="inline-flex items-center gap-2 px-3 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 font-medium text-sm"
                  >
                    <FiEdit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(blog._id)}
                    className="inline-flex items-center gap-2 px-3 py-2 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 font-medium text-sm"
                  >
                    <FiTrash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
