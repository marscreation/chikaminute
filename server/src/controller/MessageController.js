import MessageModel from "../models/messageModel.js";
import ChateModel from "../models/chatModel.js";

export const addMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message = new MessageModel({
        chatId,
        senderId,
        text,
    });
    try {
        const result = await message.save();
        const res2 = await ChateModel.findOneAndUpdate(
            { _id: chatId },
            { $set: { lastMessage: text } },
            { new: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const result = await MessageModel.find({ chatId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
