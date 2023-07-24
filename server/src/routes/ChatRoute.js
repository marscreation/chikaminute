import express from "express";
import {
    createChat,
    findChat,
    userChats,
} from "../controller/ChatController.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:id", userChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
