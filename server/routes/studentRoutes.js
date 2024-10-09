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

const router = express.Router();

// Student
router.post("/students", addStudent);
router.delete("/students", deleteStudents);
router.get("/students", getStudents);
router.put("/students/:id", updateStudent);
router.put("/students/:id/password", updatePassword);
router.put("/students/:id/status", updateStudentStatus);
router.post("/students/import", importFile);

export default router;
