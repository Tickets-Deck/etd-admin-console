export function isTokenExpired(token: string): boolean {
  if (!token) return true;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode payload
    return decoded.exp * 1000 < Date.now(); // Convert `exp` to milliseconds
  } catch (error) {
    return true; // Invalid token
  }
}
