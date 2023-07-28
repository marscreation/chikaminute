import { useEffect, useRef, useState } from "react";
import female from "../../assets/female2.png";
import ReceivedChat from "./ReceivedChat";
import SentChat from "./SentChat";
import "./ChatBox.css";
import { useChatContext } from "../../context/ChatContext";
import { User } from "../../store/userDetails";
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
        <div className="chatbox-header dark:bg-tahiti-300 dark:text-white text-black shadow-lg dark:shadow-gray-500 flex items-center">
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
      <div className="chatbox-body dark:bg-tahiti-300 pr-3 pl-3 lg:pt-5 overflow-y-auto flex-1 shadow-lg dark:shadow-gray-500 ">
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
          <label
            htmlFor="image-upload"
            className="lg:p-4 p-3 ml-3 cursor-pointer rounded-lg rounded-r-none bg-tahiti-150"
          >
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          > */}
            <TbPhotoPlus className="h-6 w-6 mt-1 lg:mt-0">
              {/* <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /> */}
            </TbPhotoPlus>

            {/* </svg> */}
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
          />

          <textarea
            ref={messageRef}
            rows="2"
            className="relative border-2 pt-1 rounded-lg rounded-l-none px-3 text-black resize-none flex-1"
            placeholder="Type your reply..."
            onKeyDown={handleKeyEnter}
          />

          <button
            className="p-3 cursor-pointer absolute mt-1 ml-64 lg:ml-150"
            onClick={handleSendButton}
          >
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          > */}
            <TbSend className="h-6 w-6">
              {/* <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" /> */}
            </TbSend>
            {/* </svg> */}
          </button>
        </div>
      )}
    </>
  );
}

export default ChatBox;
