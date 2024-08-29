import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth); // Check if user is authenticated
router.post("/signup", signup);
router.post("/", login);
router.post("/logout", logout);

export default router;
