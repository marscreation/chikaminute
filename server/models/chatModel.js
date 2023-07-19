import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        members: Array,
    },
    { timestamps: true }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
