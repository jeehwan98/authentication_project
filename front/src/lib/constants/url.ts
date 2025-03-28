export const BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export const URL = Object.freeze({
  BASE_URL: BASE,
  HEADERS: { 'Content-Type': 'application/json' },
});