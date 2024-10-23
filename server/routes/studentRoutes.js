import express from "express";
import {
  addStudent,
  deleteStudent,
  deleteMultipleStudents,
  getStudents,
  getStudentByID,
  updateStudent,
  updatePassword,
  updateStudentStatus,
  importFile,
} from "../controller/studentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Student
router.post("/students/:classCode", verifyToken, addStudent);
router.delete("/students", deleteStudent);
router.delete("/students/multiple", deleteMultipleStudents);
router.get("/students/:id", verifyToken, getStudents);
router.get("/students/id/:idNumber", getStudentByID);
router.put("/students/:id", updateStudent);
router.put("/students/:id/password", updatePassword);
router.put("/students/:id/status", updateStudentStatus);
router.post("/students/import", importFile);

export default router;
