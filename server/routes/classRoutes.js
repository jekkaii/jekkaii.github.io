import express from "express";
import {
  archiveClass,
  addClass,
  deleteClass,
  getClass,
  updateClass,
  readClasses,
  unarchiveClass,
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
router.put("/classes/:id/archive", verifyToken, archiveClass);
router.put("/classes/:id/unarchive", verifyToken, unarchiveClass);
router.get("/count", verifyToken, countClasses);

export default router;
