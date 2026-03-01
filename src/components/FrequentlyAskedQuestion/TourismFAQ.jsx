import { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What is Travel Murti?",
    answer:
      "Travel Murti is a premium group travel experience platform that curates unforgettable journeys for adventure seekers and culture lovers alike. We handle every detail — from flights to accommodation — so you can focus entirely on the experience.",
    icon: "🌍",
  },
  {
    id: 2,
    question: "Who can join Travel Murti trips?",
    answer:
      "Anyone with a passion for travel! Our trips are open to adults aged 18 and above. Whether you're a seasoned globetrotter or a first-time traveler, our carefully crafted experiences are designed to be accessible and enriching for everyone.",
    icon: "🧳",
  },
  {
    id: 3,
    question: "Can solo travelers join group trips?",
    answer:
      "Absolutely! In fact, over 60% of our travelers join solo. It's one of the best ways to meet like-minded adventurers. Our trip leaders ensure everyone feels welcome, and you'll leave with friendships that last a lifetime.",
    icon: "🙋",
  },
  {
    id: 4,
    question: "What is the group size?",
    answer:
      "Our groups typically range from 8 to 16 travelers. This sweet spot ensures an intimate experience with personalized attention from our guides, while still fostering the energy and spontaneity of group travel.",
    icon: "👥",
  },
  {
    id: 5,
    question: "What is included in the trip package?",
    answer:
      "Your package includes accommodation, guided tours, most meals, in-destination transport, a dedicated trip leader, and 24/7 on-ground support. International flights are typically not included but we can assist with bookings.",
    icon: "🎒",
  },
  {
    id: 6,
    question: "Is it safe to travel with Travel Murti?",
    answer:
      "Safety is our top priority. All our trip leaders are certified in first aid and crisis management. We continuously monitor travel advisories, partner with vetted local operators, and maintain comprehensive insurance coverage for every journey.",
    icon: "🛡️",
  },
  {
    id: 7,
    question: "Can I customise my trip itinerary?",
    answer:
      "Yes! We offer optional add-ons and free time built into every itinerary. For a truly bespoke experience, explore our private group packages where you can co-design the journey from scratch with our travel consultants.",
    icon: "✏️",
  },
  {
    id: 8,
    question: "What are the payment options?",
    answer:
      "We offer flexible payment plans including credit/debit cards, UPI, net banking, and EMI options. A small deposit secures your spot, with the balance due closer to departure. We also support international payments via PayPal and Wise.",
    icon: "💳",
  },
  {
    id: 9,
    question: "How can I contact Travel Murti for help?",
    answer:
      "Our travel experts are available 7 days a week via WhatsApp, email, and phone. You can also drop by our office in person. We typically respond within 2 hours during business hours and love a good travel chat!",
    icon: "📞",
  },
];

const FAQItem = ({ item, isOpen, onToggle, index }) => {
  return (
    <div
      style={{
        marginBottom: "12px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#ffffff",
        border: isOpen ? "1.5px solid #1a56db" : "1.5px solid #e5e7eb",
        boxShadow: isOpen
          ? "0 4px 20px rgba(26, 86, 219, 0.12)"
          : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        animation: "fadeUp 0.4s ease both",
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "18px 22px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            flexShrink: 0,
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: isOpen
              ? "linear-gradient(135deg, #1a56db, #1e40af)"
              : "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            transition: "all 0.3s ease",
            boxShadow: isOpen ? "0 4px 12px rgba(26,86,219,0.25)" : "none",
          }}
        >
          {item.icon}
        </span>

        <span
          style={{
            flex: 1,
            fontSize: "15px",
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: isOpen ? "600" : "500",
            color: isOpen ? "#1a56db" : "#1f2937",
            lineHeight: 1.5,
            transition: "color 0.3s ease",
          }}
        >
          {item.question}
        </span>

        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: isOpen ? "#1a56db" : "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4.5L6 8.5L10 4.5"
              stroke={isOpen ? "white" : "#6b7280"}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            padding: "14px 22px 20px 76px",
            color: "#6b7280",
            fontSize: "14px",
            lineHeight: 1.8,
            fontFamily: "'Inter','Segoe UI',sans-serif",
            borderTop: "1px solid #f3f4f6",
          }}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export default function TourismFAQ() {
  const [openId, setOpenId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggle = (id) => setOpenId(openId === id ? null : id);

  const filtered = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .faq-search:focus {
          outline: none;
          border-color: #1a56db !important;
          box-shadow: 0 0 0 3px rgba(26,86,219,0.1) !important;
        }
        .faq-search::placeholder { color: #9ca3af; }
        .faq-cta-btn:hover {
          background: #1e40af !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26,86,219,0.35) !important;
        }
      `}</style>

      <section
        style={{
          background: "#f9fafb",
          padding: "72px 20px",
          fontFamily: "'Inter','Segoe UI',sans-serif",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Badge — matches "HOT DEALS" / "JUST ADDED" style */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <span style={{ fontSize: "15px" }}>❓</span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f97316",
              }}
            >
              Got Questions?
            </span>
          </div>

          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "8px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(24px,4vw,34px)",
                  fontWeight: "800",
                  color: "#111827",
                  margin: "0 0 6px",
                  lineHeight: 1.2,
                }}
              >
                Frequently Asked Questions
              </h2>
              <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>
                Everything you need to know before booking your trip
              </p>
            </div>

            {/* Search */}
            <div style={{ position: "relative", minWidth: "230px" }}>
              <span
                style={{
                  position: "absolute",
                  left: "13px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "14px",
                  pointerEvents: "none",
                }}
              >
                🔍
              </span>
              <input
                className="faq-search"
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 38px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#374151",
                  background: "#fff",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {/* Blue dot divider — matches your site */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              margin: "22px 0 28px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "2px",
                background: "#1a56db",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#1a56db",
              }}
            />
            <div
              style={{
                width: "48px",
                height: "2px",
                background: "#1a56db",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "28px",
              marginBottom: "28px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "9", label: "Questions answered" },
              { value: "10K+", label: "Happy travelers" },
              { value: "50+", label: "Destinations" },
            ].map((s, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#1a56db",
                  }}
                >
                  {s.value}
                </span>
                <span style={{ fontSize: "13px", color: "#9ca3af" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* FAQ items */}
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
                index={index}
              />
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "48px 20px",
                color: "#9ca3af",
                fontSize: "15px",
                background: "#fff",
                borderRadius: "12px",
                border: "1.5px dashed #e5e7eb",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗺️</div>
              No results for "
              <strong style={{ color: "#1a56db" }}>{searchTerm}</strong>"
            </div>
          )}

          {/* CTA — matches "Book Now" button style */}
          <div
            style={{
              marginTop: "36px",
              padding: "26px 28px",
              borderRadius: "14px",
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: "700",
                  color: "#111827",
                  fontSize: "15px",
                  margin: "0 0 4px",
                }}
              >
                Still have questions?
              </p>
              <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
                Our travel experts are available 7 days a week.
              </p>
            </div>
            <button
              className="faq-cta-btn"
              style={{
                padding: "11px 26px",
                background: "#1a56db",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(26,86,219,0.25)",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              💬 Contact Us →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
