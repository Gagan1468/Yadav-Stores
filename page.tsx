"use client";

export default function SupportPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // future: send ticket to your backend
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          fontSize: 26,
          fontWeight: 650,
          marginBottom: 10,
        }}
      >
        Support & FAQ
      </h1>
      <p
        style={{
          fontSize: 13,
          color: "#9ca3af",
          marginBottom: 24,
        }}
      >
        Get help with orders, shipping, and payments. Drop a ticket and the
        team will respond within 24 hours.
      </p>

      <div
        style={{
          borderRadius: 18,
          padding: 20,
          background:
            "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.96))",
          border: "1px solid rgba(148,163,184,0.25)",
        }}
      >
        <h2
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Contact us
        </h2>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>
          Email: support@nexonstore.fake  
          Expected reply time: 6–24 hours.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Describe your issue..."
            style={{
              width: "100%",
              minHeight: 120,
              padding: 10,
              borderRadius: 10,
              border: "1px solid rgba(148,163,184,0.4)",
              backgroundColor: "#020617",
              color: "#e5e7eb",
              resize: "vertical",
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: 12,
              padding: "8px 16px",
              borderRadius: 999,
              border: "none",
              background:
                "linear-gradient(135deg, #22c55e, #0ea5e9, #6366f1)",
              color: "#020617",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Submit ticket
          </button>
        </form>
      </div>
    </main>
  );
}
