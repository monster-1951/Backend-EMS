import bcrypt from "bcrypt";
import { FindRole } from "../FindRole.js";
import { generateAccessToken } from "./generateAccessToken.js";
import { generateRefreshToken } from "./generateRefreshToken.js";
import { connectDB } from "../../Database/ConnectDB.js";
import Employee from "../../Database/models/Employee.model.js";

// const AdminEmail = "pushpa@syndicate.com";
// const AdminPassword = "1";

export const Login = async (req, res) => {
  console.log(req.body, "💫");
  const { email, password, role } = req.body;

  try {
    await connectDB(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Use findOne to find a single employee based on the email
    const EmployeeToLogIn = await Employee.findOne({ email }).select('+password');

    if (EmployeeToLogIn) {
      console.log(EmployeeToLogIn);
      console.log("Entered password:", password); // Debugging line
      console.log("Stored hashed password:", EmployeeToLogIn.password); // Debugging line

      // Compare the entered password with the stored hashed password
      bcrypt.compare(
        password,
        EmployeeToLogIn.password,
        async (err, isMatch) => {
          if (err) {
            console.log("Error comparing passwords:", err);
            return res
              .status(500)
              .json({ loginStatus: false, Error: "Server error" });
          }

          if (isMatch && EmployeeToLogIn.role == role) {
            console.log("Passwords match!");

            // Generate access and refresh tokens
            const accessToken = await generateAccessToken(email, role);
            const refreshToken = await generateRefreshToken(email, role);
            console.log(accessToken);

            // Corrected cookie options for cross-site cookies
            const cookieOptions = {
              httpOnly: true, // Prevents access from JavaScript
              sameSite: "None", // Required for cross-origin cookies
              secure: true, // Ensures cookies are only sent over HTTPS
              maxAge: 86400000, // Set expiration for cookies, 24 hours here
            };

            // Set cookies
            res.cookie("accessToken", accessToken, cookieOptions);
            res.cookie("refreshToken", refreshToken, cookieOptions);

            console.log("🍻");

            const LoggedInAs = await FindRole(accessToken);

            return res.status(200).json({
              message: "Login Successful",
              error: false,
              success: true,
              data: {
                accessToken,
                refreshToken,
                LoggedInAs,
                EmployeeToLogIn
              },
            });
          } else {
            return res
              .status(400)
              .json({ loginStatus: false, Error: "Wrong Password or role" });
          }
        }
      );
    } else {
      console.log("🥲");
      return res.status(400).json({ loginStatus: false, Error: "Wrong Email" });
    }
  } catch (err) {
    console.log("Error during login process:", err);
    return res.status(500).json({ loginStatus: false, Error: "Server error" });
  }
};
