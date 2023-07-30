import { useChatContext } from "../../context/ChatContext";
import Chatmate from "../ChatMate/ChatMate";

function ChatList({ findChat }) {
  const { chats, user } = useChatContext();

  return (
    <div className="w-full">
      <div className="font-bold p-2 text-slate-500 dark:text-slate-300">
        Conversation
      </div>
      {chats.map((chat) => (
        <Chatmate
          key={chat._id}
          data={chat}
          currentUserId={user.id}
          findChat={findChat}
        />
      ))}
    </div>
  );
}

export default ChatList;
