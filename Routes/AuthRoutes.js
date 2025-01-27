import express from "express";
import { Login } from "../Utils/Auth-Utils/Login.js";
import auth from "../middleware/auth.js";
import { logout } from "../Utils/Auth-Utils/Logout.js";


const router = express.Router();

router.post("/login",Login);
router.get('/logout',auth,logout)

export { router as AuthRouter };
