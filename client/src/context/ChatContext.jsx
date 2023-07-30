import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useUserContext } from "./UserData";

const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const user = useUserContext()
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState("");
  const [sentMessage, setSentMessage] = useState(null);
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
    socket.current = io.connect("http://127.0.0.1:3001");
    //   function userData() {
    //     try {
    //       const data = JSON.parse(
    //         atob(sessionStorage.getItem("token").split(".")[1])
    //       );
    //       setUser(data);
    //     } catch (error) {
    //       setUser({});
    //       console.log("Home Error", error);
    //     }
    //   }
    //   userData();


  }, []);

  useEffect(() => {
    //   async function getChats() {
    //     try {
    //       const data = await userChats(user.id);
    //       setChats(data);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    if (user?._id) {
      //     getChats();

      socket.current.emit("new-user-add", user._id);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
      socket.current.on("receive_message", (data) => {
        setReceivedMessage(data);
      });

    }
  }, [user]);

  useEffect(() => {
    socket.current = io.connect("http://127.0.0.1:3001");
    socket.current.on("update_chat", (data) => {
      const toChange = chats.map(chat => {
        if (chat._id !== data._id) return chat
        return data
      })
      const sorted = sortByUpdatedAt(toChange)
      setChats(sorted)
    });
  }, [chats])

  // useEffect(() => {
  //   if (sentMessage !== null) socket.current.emit("send_message", sentMessage);
  //   // updateChats(sentMessage)
  // }, [sentMessage]);

  const values = {
    user,
    chatId,
    setChatId,
    chatmateInfo,
    setChatmateInfo,
    onlineUsers,
    setSentMessage,
    receivedMessage,
    chats,
    socket,
    setChats,
    setMembers,
    members
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}
