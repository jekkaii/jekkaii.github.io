import express from "express";
import {
  addStudent,
  deleteStudents,
  getStudents,
  updateStudent,
  updatePassword,
  updateStudentStatus,
  importFile,
} from "../controller/studentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Student
router.post("/students/:classCode", verifyToken, addStudent);
router.delete("/students/:id", deleteStudents);
router.get("/students/:id", verifyToken, getStudents);
router.put("/students/:id", updateStudent);
router.put("/students/:id/password", updatePassword);
router.put("/students/:id/status", updateStudentStatus);
router.post("/students/import", importFile);

export default router;
