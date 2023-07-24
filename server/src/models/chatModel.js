import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        members: Array,
        lastMessage: {type: String, default: ""},
        chatName: {type: String, default: ""}
    },
    { timestamps: true }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
