import express from "express";
import {
  addClass,
  deleteClass,
  getClass,
  updateClass,
  readClasses,
  countClasses,
} from "../controller/classController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Student
router.post("/classes", verifyToken, addClass);
router.delete("/classes", deleteClass);
router.get("/classes/:id", getClass);
router.put("/classes/:id", updateClass);
router.get("/classes", verifyToken, readClasses);
router.get("/count", verifyToken, countClasses);

export default router;
