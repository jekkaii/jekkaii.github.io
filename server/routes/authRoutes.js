import express from "express";
import {
  signupTeacher,
  signupAdmin,
  login,
  logout,
  checkAuth,
  checkAdmin,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Authentication
router.get("/check-auth", verifyToken, checkAuth); // Check if user is authenticated
router.get("/check-admin", verifyToken, checkAdmin);
router.post("/createteacher", signupTeacher);
router.post("/createadmin", signupAdmin);
router.post("/", login);
router.post("/logout", logout);

export default router;
