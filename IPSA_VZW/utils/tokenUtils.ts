/**
 * Decode JWT token and check if it's expired
 * JWT structure: header.payload.signature
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    // Split token into parts
    const parts = token.split(".");
    if (parts.length !== 3) {
      return true; // Invalid token format
    }

    // Decode payload (base64)
    const payload = JSON.parse(atob(parts[1]));

    // Check expiration: exp is in seconds, Date.now() is in milliseconds
    if (payload.exp) {
      const expirationTime = payload.exp * 1000;
      return Date.now() > expirationTime;
    }

    // If no exp claim, consider it valid (shouldn't happen with proper JWT)
    return false;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat decode errors as expired
  }
};
