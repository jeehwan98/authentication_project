export const BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export const METHOD = Object.freeze({
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE"
})

export const URL = Object.freeze({
  BASE_URL: BASE,
  HEADERS: { 'Content-Type': 'application/json' },
});