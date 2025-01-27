import jwt from "jsonwebtoken";

export const generateAccessToken = async (Email,role) => {
    const token = await jwt.sign(
      { role: role, email: Email },
      process.env.SecretKey,
      {
        expiresIn: "5h",
      }
    );
    return token;
  };