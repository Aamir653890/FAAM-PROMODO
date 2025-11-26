import React from "react";
import Timer from "../components/Timer";

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", background: "#061428", color: "white", padding: 24, fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ margin: 0 }}>AAM Promodo</h1>
          <div style={{ fontSize: 14, opacity: 0.85 }}>Dark-blue Pomodoro • PWA-ready</div>
        </header>

        <section style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <Timer />
          </div>
          <aside style={{ width: 320 }}>
            <div style={{ background: "#071a2b", padding: 16, borderRadius: 10 }}>
              <h3 style={{ marginTop: 0 }}>Session settings</h3>
              <p style={{ marginBottom: 8 }}>Fast, clean, and focused.</p>
              <button style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#1E90FF", color: "#00203F", border: "none", cursor: "pointer" }}>Connect Spotify (placeholder)</button>
            </div>
          </aside>
        </section>

        <footer style={{ marginTop: 32, color: "#9fb1c9" }}>
          Built for you — drop this in your repo and deploy to Vercel/Netlify.
        </footer>
      </div>
    </main>
  );
}
