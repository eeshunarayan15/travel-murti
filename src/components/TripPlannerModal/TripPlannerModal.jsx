// TripPlannerModal.jsx
import { useState, useEffect } from "react";

export default function TripPlannerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    destination: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    // ⏱️ Show modal after 60 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000); // change to 5000 for testing (5 sec)

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "32px",
          width: "100%",
          maxWidth: "420px",
          margin: "0 20px",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#6b7280",
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: "20px", fontWeight: "800", margin: "0 0 6px" }}>
          Let's plan your dream trip!
        </h2>
        <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 22px" }}>
          Drop a few details, and we'll craft an unforgettable adventure just
          for you!
        </p>

        {/* Inputs */}
        {[
          { key: "name", placeholder: "Name", type: "text" },
          {
            key: "destination",
            placeholder: "Choose your destination...",
            type: "text",
          },
          { key: "email", placeholder: "Email", type: "email" },
        ].map((field) => (
          <input
            key={field.key}
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.key]}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1.5px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              marginBottom: "12px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        ))}

        {/* Phone with +91 */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <div
            style={{
              padding: "12px 14px",
              border: "1.5px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#374151",
              background: "#f9fafb",
            }}
          >
            +91
          </div>
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "1.5px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* CTA Button */}
        <button
          style={{
            width: "100%",
            padding: "14px",
            background: "#1a56db", // change to #2d7a55 for green like captureatrip
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontWeight: "700",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Talk to our Experts
        </button>
      </div>
    </div>
  );
}
