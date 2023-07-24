import { useEffect, useState } from "react";
import { userChats } from "../../api/ChatRequest";
import Chatmate from "../Chatmate/Chatmate";

function ChatList() {
  const [chats, setChats] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await userChats(userId);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, []);

  return (
    <div className="w-full py-3">
      <label className="font-bold mt-0.5 ml-2 text-slate-500 lg:mt-11 lg:ml-6">
        Conversation
      </label>
      {chats.map((chat) => (
        <Chatmate key={chat._id} data={chat} currentUserId={userId} />
      ))}
    </div>
  );
}

export default ChatList;
