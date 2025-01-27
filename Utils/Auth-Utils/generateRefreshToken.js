import jwt from "jsonwebtoken";

export const generateRefreshToken = async (Email,role) => {
    const token = await jwt.sign(
        { role: role, email: Email },
        process.env.SecretKey,
        {
          expiresIn: "7d",
        }
      );
      return token;
}
