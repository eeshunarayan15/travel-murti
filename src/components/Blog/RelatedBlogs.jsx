
import { fetchBlogs } from "@/redux/thunk/blogThunk";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80";

export default function RelatedBlogs() {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  // ✅ Redux state
  const blogs = useSelector((state) => state.blogs.blogs);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);
  const loading = status === "idle" || status === "loading";

  // ✅ Fetch only once
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -340 : 340,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .blog-scroll::-webkit-scrollbar { display: none; }
        .blog-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .blog-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important;
        }
        .blog-card:hover .blog-img {
          transform: scale(1.04);
        }
        .blog-img {
          transition: transform 0.4s ease;
        }
        .read-now-link {
          color: #1a56db;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
        .read-now-link:hover { text-decoration: underline; }

        .scroll-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .scroll-btn:hover {
          background: #1a56db;
          border-color: #1a56db;
        }
        .scroll-btn:hover svg path { stroke: white; }

        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 8px;
        }
      `}</style>

      <section
        style={{
          padding: "56px 0",
          background: "#fff",
          fontFamily: "'Inter','Segoe UI',sans-serif",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "28px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(20px, 3vw, 26px)",
                fontWeight: "800",
                color: "#111827",
                margin: 0,
              }}
            >
              Related Blogs
            </h2>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* ✅ Link instead of <a> — no page reload */}
              <Link
                to="/blog"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#1a56db";
                  e.currentTarget.style.color = "#1a56db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.color = "#374151";
                }}
              >
                Read All
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7h8M7.5 4l3.5 3-3.5 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Scroll arrows */}
              <button className="scroll-btn" onClick={() => scroll("left")}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 12L6 8l4-4"
                    stroke="#374151"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="scroll-btn" onClick={() => scroll("right")}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 4l4 4-4 4"
                    stroke="#374151"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Error state */}
          {error && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#ef4444",
                fontSize: "15px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div style={{ display: "flex", gap: "20px", overflow: "hidden" }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ minWidth: "300px", flexShrink: 0 }}>
                  <div
                    className="skeleton"
                    style={{ height: "200px", marginBottom: "12px" }}
                  />
                  <div
                    className="skeleton"
                    style={{
                      height: "20px",
                      width: "80%",
                      marginBottom: "8px",
                    }}
                  />
                  <div
                    className="skeleton"
                    style={{ height: "16px", width: "60%" }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Blog cards — horizontally scrollable */}
          {!loading && !error && (
            <div
              ref={scrollRef}
              className="blog-scroll"
              style={{
                display: "flex",
                gap: "20px",
                overflowX: "auto",
                paddingBottom: "8px",
              }}
            >
              {blogs.length === 0 ? (
                <p style={{ color: "#9ca3af", fontSize: "15px" }}>
                  No blogs published yet.
                </p>
              ) : (
                blogs.map((blog) => (
                  // ✅ Link instead of <a href> — no page reload
                  <Link
                    key={blog._id}
                    to={`/blog/${blog.slug}`}
                    className="blog-card"
                    style={{
                      minWidth: "300px",
                      maxWidth: "300px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1.5px solid #f3f4f6",
                      background: "#fff",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      flexDirection: "column",
                      flexShrink: 0,
                    }}
                  >
                    {/* Image */}
                    <div style={{ overflow: "hidden", height: "200px" }}>
                      <img
                        src={blog.coverImage || blog.image || PLACEHOLDER}
                        alt={blog.title}
                        className="blog-img"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.src = PLACEHOLDER;
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        padding: "16px",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#111827",
                          margin: "0 0 14px",
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {blog.title}
                      </h3>

                      {/* Meta row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "1px solid #f3f4f6",
                          paddingTop: "12px",
                        }}
                      >
                        <span style={{ fontSize: "13px", color: "#9ca3af" }}>
                          {formatDate(blog.publishedAt || blog.createdAt)}
                          {blog.readTime && ` | ${blog.readTime} Min Read`}
                        </span>

                        <span className="read-now-link">
                          Read Now
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3 7h8M7.5 4l3.5 3-3.5 3"
                              stroke="#1a56db"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
