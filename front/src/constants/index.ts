export function getUserId(input: string): string {
  return input.split("@")[0];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const URL = Object.freeze({
  HEADERS: { 'Content-Type': 'application/json' },
  REGISTER_USER_EMAIL: `${BASE_URL}/auth/register`,
  CHECK_EXISTING_USER: `${BASE_URL}/auth/checkUser`,
  REGISTER_USER_GITHUB: `${BASE_URL}/auth/register/github`,
  LOGIN: `${BASE_URL}/auth/login`,
});