import express from "express";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);

export default router;
