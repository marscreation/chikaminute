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
    <div className="w-full">
      <label className="font-bold p-2 text-slate-500 dark:text-white">

        Conversation
      </div>
      {chats.map((chat) => (
        <Chatmate key={chat._id} data={chat} currentUserId={userId} />
      ))}
    </div>
  );
}

export default ChatList;
