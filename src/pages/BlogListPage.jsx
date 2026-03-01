import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/blog.service";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs(true)
      .then(setBlogs)
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Travel Blog</h1>
        <p className="text-gray-600 mb-10">
          Stories, tips, and inspiration for your next journey
        </p>

        {loading ? (
          <p className="text-center py-12">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center py-12 text-gray-500">No blogs yet.</p>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {blog.coverImage && (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  {blog.excerpt && (
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    {blog.author} •{" "}
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString()
                      : "Draft"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
