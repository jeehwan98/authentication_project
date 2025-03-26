export function getUserId(input: string): string {
  return input.split("@")[0];
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name: string) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

export function capitalizeFirstLetter(input: string) {
  return input.split('')[0].toUpperCase() + input.slice(1);
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const URL = Object.freeze({
  HEADERS: { 'Content-Type': 'application/json' },
  REGISTER_USER_EMAIL: `${BASE_URL}/auth/register`,
  CHECK_EXISTING_USER: `${BASE_URL}/auth/checkUser`,
  REGISTER_USER_GITHUB: `${BASE_URL}/auth/register/github`,
  LOGIN: `${BASE_URL}/auth/login`,
});