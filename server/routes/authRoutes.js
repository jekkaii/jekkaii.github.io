import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
  checkAdmin,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { addUser } from "../controller/addUserController.js";
import { addStudent } from "../controller/addStudentController.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth); // Check if user is authenticated
router.get("/check-admin", verifyToken, checkAdmin);
router.post("/signup", signup);
router.post("/", login);
router.post("/logout", logout);
router.post("/addstudent", addStudent);
router.post("/adduser", addUser);
export default router;
