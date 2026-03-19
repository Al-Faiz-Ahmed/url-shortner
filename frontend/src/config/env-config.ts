export const envConfig = {
  BACKEND_API_URL:
    // Vite exposes only variables prefixed with VITE_
    import.meta.env.VITE_BACKEND_API_URL ?? "http://localhost:5000",
  FRONTEND_SITE_URL: import.meta.env.VITE_PUBLIC_SITE_URL
};
