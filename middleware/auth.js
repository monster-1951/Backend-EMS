import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    // Extract token from cookies or authorization header
    const token =
      request.cookies.accessToken ||
      request.header?.authorization?.split(" ")[1]; // ["Bearer", "token"]

    console.log("token 🥲🥲", token);

    if (!token) {
      return response.status(401).json({
        message: "Provide token",
      });
    }

    // Verify the token
    const decode = await jwt.verify(token, process.env.SecretKey);

    if (!decode) {
      return response.status(401).json({
        message: "Unauthorized access",
        error: true,
        success: false,
      });
    }

    console.log("decoded", decode);

    // Add the decoded information (e.g., email) to the request object
    request.email = decode.email;
    request.role = decode.role
    // Proceed to the next middleware
    next();
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
