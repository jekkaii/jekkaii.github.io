import express from "express";
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
  updatePassword,
  updateStudentStatus,
} from "../controller/studentController.js";

const router = express.Router();

// Student
router.post("/students", addStudent);
router.delete("/students/:id", deleteStudent);
router.get("/students", getStudents);
router.put("/students/:id", updateStudent);
router.put("/students/:id/password", updatePassword);
router.put("/students/:id/status", updateStudentStatus);

export default router;
