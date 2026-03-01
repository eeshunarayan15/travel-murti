import { useState } from "react";

const reasons = [
  {
    id: 1,
    icon: "🧳",
    title: "Solo travel is safe with us.",
    desc: "No need to wait for friends or family — just pack and go! Explore India stress-free with 100% freedom and our full support.",
  },
  {
    id: 2,
    icon: "🚩",
    title: "We're your safety net.",
    desc: "We ensure safety with verified stays, reliable transport, and trained guides for a secure, comfy, and hassle-free trip.",
  },
  {
    id: 3,
    icon: "👷",
    title: "Our Trip Captains are legendary.",
    desc: "Our awesome trip captains are part-guide, part-friend, and full-time vibe curators — always with you.",
  },
  {
    id: 4,
    icon: "💸",
    title: "No hidden fees. Ever.",
    desc: "No middlemen, no surprise charges. Enjoy direct bookings, lower costs, and personalized support for a seamless trip.",
  },
  {
    id: 5,
    icon: "🤙",
    title: "Vibe check comes first.",
    desc: "We customize trips based on age groups, so you're never stuck vibing to someone else's playlist without permission.",
  },
  {
    id: 6,
    icon: "🗺️",
    title: "50+ handpicked destinations.",
    desc: "From spiritual yatras to Himalayan adventures — every destination is handpicked and expertly curated just for you.",
  },
];

export default function WhyChooseUs() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Wave SVG top & bottom */
        .wave-top, .wave-bottom {
          display: block;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }
        .wave-bottom {
          transform: rotate(180deg);
        }

        .reason-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .reason-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important;
        }
      `}</style>

      {/* Wave top */}
      <div className="wave-top">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", height: "50px", width: "100%" }}
        >
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            fill="#a8d5c2"
          />
        </svg>
      </div>

      <section
        style={{
          background: "linear-gradient(180deg, #a8d5c2 0%, #b8ddd0 100%)",
          padding: "60px 20px",
          fontFamily: "'Inter','Segoe UI',sans-serif",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 32px)",
                fontWeight: "800",
                color: "#1a2e22",
                margin: 0,
                letterSpacing: "-0.3px",
                animation: "fadeUp 0.5s ease both",
              }}
            >
              Reasons To Make Us Your Travel Bestie
            </h2>
            <div
              style={{
                width: "48px",
                height: "3px",
                background: "#2d7a55",
                borderRadius: "2px",
                margin: "14px auto 0",
              }}
            />
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {reasons.map((r, i) => (
              <div
                key={r.id}
                className="reason-card"
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "24px 22px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "18px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  border:
                    hovered === r.id
                      ? "1.5px solid #2d7a55"
                      : "1.5px solid transparent",
                  animation: `fadeUp 0.5s ease both`,
                  animationDelay: `${i * 0.08}s`,
                  cursor: "default",
                }}
              >
                {/* Icon bubble */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: hovered === r.id ? "#2d7a55" : "#e8f5ee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    transition: "background 0.25s ease",
                  }}
                >
                  {r.icon}
                </div>

                {/* Text */}
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#1a2e22",
                      margin: "0 0 6px",
                      lineHeight: 1.3,
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "#6b7280",
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: "center", marginTop: "44px" }}>
            <button
              style={{
                padding: "13px 32px",
                background: "#2d7a55",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(45,122,85,0.35)",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#1f5c3e";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#2d7a55";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Start Your Journey with Travel Murti →
            </button>
          </div>
        </div>
      </section>

      {/* Wave bottom */}
      <div className="wave-bottom">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", height: "50px", width: "100%" }}
        >
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            fill="#a8d5c2"
          />
        </svg>
      </div>
    </>
  );
}
