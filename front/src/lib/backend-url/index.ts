const PUBLIC_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const URL = Object.freeze({
  HEADERS: { 'Content-Type': 'application/json' },
  REGISTER_USER_EMAIL: `${PUBLIC_URL}/auth/register`,
  CHECK_EXISTING_USER: `${PUBLIC_URL}/auth/checkUser`,
  REGISTER_USER_GITHUB: `${PUBLIC_URL}/auth/register/github`,
  LOGIN: `${PUBLIC_URL}/auth/login`,
});

export {
  URL
}