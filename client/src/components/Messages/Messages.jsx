import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { getMessage, sendMessage } from '../../api/MessageRequest';
import { useUserContext } from '../../context/UserData';
import { TbPhotoPlus, TbSend } from 'react-icons/tb';
import { useChatContext } from '../../context/ChatContext';
import female from "../../assets/female2.png";
import "./Messages.css"

function Messages() {
  const user = useUserContext()
  const { chats, receivedMessage, onlineUsers, members } = useChatContext()
  const { chatId } = useParams("chatId")
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(false)
  const [messages, setMessages] = useState([])
  const [currentMember, setCurrentMember] = useState({})
  const messageRef = useRef()
  const scroll = useRef()

  const loadMessages = async () => {
    const listMessages = await getMessage(chatId);
    setMessages(listMessages)
    setLoading(false)

  }

  const handleSendButton = async () => {
    if (messageRef.current.value === "") return;
    const textMessage = messageRef.current.value;

    try {
      const receiverId = await chats
        .find((chat) => chatId === chat?._id)
        .members.find((id) => id !== user._id);
      const msg = {
        senderId: user._id,
        message: textMessage,
        receiverId,
        chatId,
      };

      const data = await sendMessage(msg);
      const newValue = [...messages]
      setMessages([data].concat(newValue));
      messageRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  }

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendButton();
    }
  }

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chatId) {
      setMessages([receivedMessage, ...messages]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    loadMessages()
  }, [user, chatId])

  useEffect(() => {
    const current = members.find(id => chatId === id.chatId)
    console.log("members", members, current)
    setCurrentMember(current)
  }, [chatId, members])

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const chat = chats.find(chat => chat._id === chatId)?.members.find(id => id !== user._id)
    const active = onlineUsers.find((id) => chat === id.userId);
    setOnline(active)
  }, [onlineUsers, chatId]);

  if (loading) {
    return (<div className='dark:text-slate-600 font-extrabold text-2xl h-full flex place-items-center place-content-center'>...Loding</div>)
  }

  if (!messages) {
    return (<div>Error on load</div>)
  }

  return (
    <>
      <div key={`${chatId}header`} className="chatbox-header dark:bg-tahiti-300 dark:text-white text-black shadow-lg dark:shadow-none flex items-center">
        <div className="sm:hidden flex-none">
          <button className="p-2 text-blue-800 dark:text-white" onClick={()=>document.querySelector("section.chatbox").classList.remove("show")}>
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
            {currentMember?.firstname} {currentMember?.lastname}
          </h1>
          {online && <p className="text-xs text-left">Active now</p>}
        </div>
      </div>
      <div key={`${chatId}body`} className="chatbox-body dark:bg-tahiti-300 pr-3 pl-3 lg:pt-5 overflow-y-auto flex-1 shadow-lg ">
        {user && [...messages]?.reverse().map((message) => (
          <>
            <div
              key={message._id}
              className={message.senderId == user._id ? "sender" : "receiver"}
            >
              <div className="mt-3">
                <p className="bg-tahiti-100 p-2 w-auto rounded-xl">
                  {message.text}
                </p>
              </div>
            </div>
          </>
        ))}
        {messages.length == 0 && (<div className='dark:text-slate-600 font-extrabold text-2xl h-full flex place-items-center place-content-center'>Start Conversation</div>)}
        <div ref={scroll}></div>
      </div>

      {/* textarea */}
      <div key={`${chatId}textarea`} className="flex py-3 px-1 dark:bg-tahiti-300">
        {/* <div className="flex items-center lg:p-4 p-3 ml-3 cursor-pointer rounded-lg rounded-r-none dark:text-tahiti-300 bg-tahiti-150">
          <TbPhotoPlus className="h-6 w-6 mt-1 lg:mt-0" />
        </div>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden h-full"
        /> */}
        <div className="relative flex-1">
          <textarea
            ref={messageRef}
            rows="2"
            className="dark:bg-tahiti-200 w-full h-full dark:text-white border-2 dark:border-slate-600 pt-1 rounded-lg px-3 text-black resize-none"
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
    </>
  );
}

export default Messages