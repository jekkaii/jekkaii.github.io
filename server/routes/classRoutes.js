import express from "express";
import {
    addClass,
    deleteClass,
    getClass,
    updateClass,
    readClasses,
} from "../controller/classController.js";

const router = express.Router();

// Student
router.post("/class", addClass);
router.delete("/class", deleteClass);
router.get("/class/:id", getClass);
router.put("/class/:id", updateClass);
router.get("/class/", readClasses);


export default router;
