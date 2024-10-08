import express from "express";
import {
  addStudent,
  deleteStudents,
  getStudents,
  updateStudent,
  updatePassword,
  updateStudentStatus,
} from "../controller/studentController.js";

const router = express.Router();

// Student
router.post("/students", addStudent);
router.delete("/students", deleteStudents);
router.get("/students", getStudents);
router.put("/students/:id", updateStudent);
router.put("/students/:id/password", updatePassword);
router.put("/students/:id/status", updateStudentStatus);

export default router;
