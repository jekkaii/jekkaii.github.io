import express from "express";
import{
    getUsers,
    addUser,
    editUser,
    deleteUser,
    updateStatus,
    getAllUsers,
    getUserById,
    // validation functions
        // validateAddUserInput,
        // validateEditUserInput,
        // validateDeleteStatusInput,
        // validateUpdateStatusInput,
} from "../controller/adminController.js";

const router = express.Router();

// User
router.get("/users", getUsers);
router.post("/users", addUser);
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/status", updateStatus);
router.get("/users/:id", getUserById);
router.get("/users/all", getAllUsers);

export default router;