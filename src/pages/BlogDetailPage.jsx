import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogBySlug } from "../services/blog.service";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getBlogBySlug(slug)
        .then(setBlog)
        .catch(() => setBlog(null))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-24 flex justify-center">Loading...</div>;
  if (!blog) return <div className="min-h-screen pt-24 text-center">Blog not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4">
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
        )}

        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-6">
          {blog.author} • {blog.publishedAt && new Date(blog.publishedAt).toLocaleDateString()}
        </p>

        <div
          className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br />") }}
        />

        <Link
          to="/blog"
          className="inline-block mt-8 text-blue-600 hover:underline"
        >
          ← Back to Blog
        </Link>
      </article>
    </div>
  );
};

export default BlogDetailPage;
