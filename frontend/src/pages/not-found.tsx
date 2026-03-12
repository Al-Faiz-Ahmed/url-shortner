import { useRouteError, Link } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError() as {status?:number};
  const is404 = error?.status === 404;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <p style={styles.status}>{is404 ? "404" : "Oops"}</p>
        <h1 style={styles.heading}>
          {is404 ? "Link not found" : "Something went wrong"}
        </h1>
        <p style={styles.sub}>
          {is404
            ? "This short link doesn't exist or may have expired."
            : "We couldn't resolve this link right now. Try again later."}
        </p>
        <Link to="/" style={styles.btn}>
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}

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
  },
  status: {
    fontSize: "4rem",
    fontWeight: 800,
    color: "#1e1e1e",
    margin: "0 0 8px",
    letterSpacing: "-0.04em",
    lineHeight: 1,
  },
  heading: {
    margin: "0 0 12px",
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "#f5f5f5",
  },
  sub: {
    margin: "0 0 28px",
    fontSize: "0.9rem",
    color: "#666",
    lineHeight: 1.6,
  },
  btn: {
    display: "inline-block",
    padding: "10px 22px",
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    color: "#6ee7b7",
    textDecoration: "none",
    fontSize: "0.88rem",
    fontWeight: 500,
  },
};