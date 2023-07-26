import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client"
import { userChats } from "../api/ChatRequest";

const ChatContext = createContext()

export function useChatContext() {
  return useContext(ChatContext)
}

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([])
  const [chatId, setChatId] = useState("")
  const [sentMessage, setSentMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState({})
  const [chatmateInfo, setChatmateInfo] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [user, setUser] = useState({})
  const socket = useRef()

  useEffect(() => {
    socket.current = io.connect("http://127.0.0.1:3001")
    function userData() {
      try {
        const data = JSON.parse(
          atob(sessionStorage.getItem("token").split(".")[1])
        );
        setUser(data)
      } catch (error) {
        setUser({})
        console.log("Home Error", error)
      }
    }
    userData()
    socket.current.on("receive_message", data => {
      setReceivedMessage(data)
    })
  }, [])

  useEffect(() => {
    async function getChats() {
      try {
        const data = await userChats(user.id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.id) {
      getChats();

      socket.current.emit("new-user-add", user.id)
      socket.current.on("get-users", users => {
        setOnlineUsers(users)
      })

    }
  }, [user])

  useEffect(() => {
    if (sentMessage !== null)
      socket.current.emit("send_message", sentMessage);
  }, [sentMessage])

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
    socket
  }

  return (
    <ChatContext.Provider value={values}>
      {children}
    </ChatContext.Provider>
  )
}