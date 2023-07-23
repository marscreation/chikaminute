import { createContext, useContext, useEffect, useState } from "react";
import { getMessage } from "../api/MessageRequest";

const ChatContext = createContext()

export function useChatContext() {
    return useContext(ChatContext)
}

export function ChatProvider({ children }) {
    const [chatId, setChatId] = useState("")
    const [conversation, setConversation] = useState([])
    const [chatmateInfo, setChatmateInfo] = useState([])

    useEffect(() => {
        const getConversation = async () => {
            try {
                if (chatId == "") return []
                const message = await getMessage(chatId)
                setConversation(message)
            } catch (error) {
                console.log(error)
            }
        }
        getConversation()
    }, [chatId])

    return (
        <ChatContext.Provider value={{ chatId, setChatId, conversation, chatmateInfo, setChatmateInfo }}>
            {children}
        </ChatContext.Provider>
    )
}