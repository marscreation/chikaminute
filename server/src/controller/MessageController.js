import MessageModel from "../models/messageModel.js";
import ChatModel from "../models/chatModel.js";

export const addMessage = async (req, res) => {
  const io = res.locals.io;
  const { chatId, senderId, text, receiverId } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    const res2 = await ChatModel.findOneAndUpdate(
      { _id: chatId },
      { $set: { lastMessage: text } },
      { new: true }
    );
    console.log("findOneAndUpdate", res2);
    // if (typeof receiverId != undefined ) {
    const activeUser = global.activeUsers.find(
      (user) => user.userId === receiverId
    );
    if (activeUser?.socketId)
      io.to(activeUser.socketId).emit("receive_message", result);

    const chatMembers = res2.members.map((member) =>
      global.activeUsers.find((user) => user.userId === member)
    );
    console.log("chatMembers", chatMembers);
    for (const member of chatMembers) {
      if (member) io.to(member.socketId).emit("update_chat", res2);
    }
    // }
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
