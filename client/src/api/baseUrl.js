export const BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "" : "https://sweet-bliss-ja4h.onrender.com")
).replace(/\/+$/, "");
