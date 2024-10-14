import express from "express";
import {
    archiveClass,
    addClass,
    deleteClass,
    getClass,
    updateClass,
    readClasses,
} from "../controller/classController.js";

const router = express.Router();

// Student
router.post("/classes", addClass);
router.delete("/classes", deleteClass);
router.get("/classes/:id", getClass);
router.put("/classes/:id", updateClass);
router.get("/classes/", readClasses);
router.patch("/classes/archive", archiveClass);

export default router;
