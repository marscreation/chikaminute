import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useUserContext } from "./UserData";
import io from "socket.io-client";

const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const user = useUserContext()
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState("");
  const [receivedMessage, setReceivedMessage] = useState({});
  const [chatmateInfo, setChatmateInfo] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const socket = useRef();

  function sortByUpdatedAt(data) {
    return data.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA;
    });
  }

  useEffect(() => {
    socket.current = io.connect(import.meta.env.VITE_REACT_SOCKET_URL);
  }, []);

  useEffect(() => {
    if (user?._id) {
      socket.current.emit("new-user-add", user._id);
      
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });

      socket.current.on("receive_message", (data) => {
        setReceivedMessage(data);
      });
      
      socket.current.on("update_chat", (data) => {
        setChats(prev => {
          const toChange = prev.map(chat => {
            if (chat._id !== data._id) return chat
            return data
          })
          return sortByUpdatedAt(toChange)
        })
      });
    }
  }, [user]);

  const values = {
    user,
    chatId,
    setChatId,
    chatmateInfo,
    setChatmateInfo,
    onlineUsers,
    receivedMessage,
    chats,
    socket,
    setChats,
    setMembers,
    members
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}
