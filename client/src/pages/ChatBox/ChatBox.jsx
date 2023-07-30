import { useEffect, useRef, useState } from "react";
import female from "../../assets/female2.png";
import "./ChatBox.css";
import { useChatContext } from "../../context/ChatContext";
import { getMessage, sendMessage } from "../../api/MessageRequest";
import { TbSend } from "react-icons/tb";
import { TbPhotoPlus } from "react-icons/tb";

function ChatBox() {
  const { chatId, chatmateInfo, user, chats, setSentMessage, receivedMessage } =
    useChatContext();
  const [chatSelected, setChatSelected] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef("");
  const scroll = useRef(null);

  const handleSendButton = async () => {
    if (messageRef.current.value === "") return;
    const textMessage = messageRef.current.value;

    try {
      const receiverId = await chats
        .find((chat) => chatId === chat?._id)
        .members.find((id) => id !== user.id);
      const msg = {
        senderId: user.id,
        message: textMessage,
        receiverId,
        chatId,
      };

      const data = await sendMessage(msg);
      setMessages([...messages, data]);
      messageRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyEnter = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendButton();
    }
  };
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chatId) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        if (chatId == "") return [];
        const message = await getMessage(chatId);
        if (message?.length > 0) {
          setChatSelected(true);
        } else {
          setChatSelected(false);
        }
        setMessages(message);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [chatId]);

  useEffect(() => {
    setIsOnline(chatmateInfo?.online);
  }, [chatmateInfo]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {chatSelected ? (
        <div className="chatbox-header dark:bg-tahiti-300 dark:text-white text-black shadow-lg dark:shadow-none flex items-center">
          <div className="sm:hidden flex-none">
            <button className="p-2 border-2 text-blue-800 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex-none p-3 ml-3">
            <img
              src={female}
              alt=""
              className="border-2 border-white dark:border-gray-500 rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
            />
          </div>
          <div className="relative flex-1">
            <h1 className="font-bold text-left text-2xl">
              {chatmateInfo?.firstname} {chatmateInfo?.lastname}
            </h1>
            {isOnline && <p className="text-xs text-left">Active now</p>}
          </div>
        </div>
      ) : (
        <div className="text-2xl text-center font-bold text-slate-500 dark:text-white font-poppins">
          No conversation yet
        </div>
      )}
      <div className="chatbox-body dark:bg-tahiti-300 pr-3 pl-3 lg:pt-5 overflow-y-auto flex-1 shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {messages &&
          messages.map((message) => (
            <>
              <div
                key={message._id}
                className={message.senderId == user.id ? "sender" : "receiver"}
              >
                <div className="mt-3">
                  <p className="bg-tahiti-100 p-2 w-auto rounded-xl">
                    {message.text}
                  </p>
                </div>
              </div>
            </>
          ))}
        <div ref={scroll}></div>
      </div>
      {chatSelected && (
        <div className="flex py-3 px-1 dark:bg-tahiti-300">
          <div className="flex items-center lg:p-4 p-3 ml-3 cursor-pointer rounded-lg rounded-r-none dark:text-tahiti-300 bg-tahiti-150">
            <TbPhotoPlus className="h-6 w-6 mt-1 lg:mt-0" />
          </div>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden h-full"
          />
          <div className="relative flex-1">
            <textarea
              ref={messageRef}
              rows="2"
              className="dark:bg-tahiti-200 w-full h-full dark:text-white border-2 pt-1 rounded-lg rounded-l-none px-3 text-black resize-none"
              placeholder="Type your reply..."
              onKeyDown={handleKeyEnter}
            />

            <button
              className="dark:text-white cursor-pointer absolute top-2 right-3 transform translate-y-1/2"
              onClick={handleSendButton}
            >
              <TbSend className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
