export function getUserId(input: string): string {
  return input.split("@")[0];
}