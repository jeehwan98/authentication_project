export function getUserId(input: string): string {
  return input.split("@")[0];
}

export function capitalizeFirstLetter(input: string) {
  return input.split('')[0].toUpperCase() + input.slice(1);
}