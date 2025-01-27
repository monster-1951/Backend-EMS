import jwtDecode from "jsonwebtoken";
export const FindRole = (accessToken) => {
  try {
    // Decode the token
    const decoded = jwtDecode.decode(accessToken);
    console.log(decoded.role,"💫👉")
    return decoded.role;

    // Return null if the token is invalid or does not contain 'role'
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
