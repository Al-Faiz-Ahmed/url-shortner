
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";

// ─── Loader (runs before component mounts) ───────────────────────────────────
// React Router v7 calls this automatically when /:slug is matched.
// Return the resolved URL, or throw a redirect / error.


// ─── Component (only shown for the soft-redirect alternative) ─────────────────

export default function SlugPage() {
  const { slug } = useParams();
  const data = useLoaderData(); // { originalUrl } — only present in soft mode

  // Soft-redirect: give the user a brief "Redirecting…" screen
  useEffect(() => {
    if (data?.originalUrl) {
      const timer = setTimeout(() => {
        window.location.href = data.originalUrl;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Animated link icon */}
        <div style={styles.iconWrap}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </div>

        <h1 style={styles.heading}>Redirecting…</h1>
        <p style={styles.sub}>
          Following <code style={styles.code}>/{slug}</code> to its destination
        </p>

        {/* Animated progress bar */}
        <div style={styles.barTrack}>
          <div style={styles.barFill} />
        </div>

        {data?.originalUrl && (
          <p style={styles.hint}>
            Taking too long?{" "}
            <a href={data.originalUrl} style={styles.link}>
              Click here
            </a>
          </p>
        )}
      </div>

      {/* Keyframes injected inline so no extra CSS file needed */}
      <style>{`
        @keyframes fillBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  wrapper: {
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0a0a0a",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  card: {
    padding: "48px 40px",
    borderRadius: "20px",
    background: "#111",
    border: "1px solid #222",
    maxWidth: "400px",
    width: "90%",
    animation: "fadeUp 0.4s ease both",
  },
  iconWrap: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    color: "#6ee7b7",
    marginBottom: "24px",
  },
  heading: {
    margin: "0 0 8px",
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "#f5f5f5",
    letterSpacing: "-0.02em",
  },
  sub: {
    margin: "0 0 28px",
    fontSize: "0.9rem",
    color: "#666",
  },
  code: {
    background: "#1e1e1e",
    color: "#6ee7b7",
    padding: "2px 7px",
    borderRadius: "6px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.85em",
  },
  barTrack: {
    height: "4px",
    background: "#1e1e1e",
    borderRadius: "99px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  barFill: {
    height: "100%",
    width: "0%",
    background: "linear-gradient(90deg, #34d399, #6ee7b7)",
    borderRadius: "99px",
    animation: "fillBar 1.5s ease forwards",
  },
  hint: {
    margin: 0,
    fontSize: "0.82rem",
    color: "#444",
  },
  link: {
    color: "#6ee7b7",
    textDecoration: "none",
    fontWeight: 500,
  },
};
