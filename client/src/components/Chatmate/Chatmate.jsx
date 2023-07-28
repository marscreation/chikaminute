import { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/UserRequest";
import person2 from "../../assets/person2.png";
import { formatDate } from "../../util/helper";
import { useChatContext } from "../../context/ChatContext";

function Chatmate({ data, currentUserId }) {
  const [userData, setUserData] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [selected, setSelected] = useState(false);
  const { chatId, setChatId, setChatmateInfo, onlineUsers } = useChatContext();
  const timeoutIdRef = useRef();

  const getConversation = (info) => {
    setChatId(data._id);
    setChatmateInfo(userData);
    setSelected(true); // Set to true when the chatmate is clicked
  };

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const response = await getUser(userId);
        setUserData(response);
        // setChatmateInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  // wait 30s before show offline status of chat member
  useEffect(() => {
    const online = onlineUsers.find((id) => userData?._id === id.userId);
    if (online) {
      setIsOnline(true);
      clearTimeout(timeoutIdRef.current);
    } else {
      const timeoutId = setTimeout(() => {
        setIsOnline(false);
      }, 30000);
      timeoutIdRef.current = timeoutId;
    }
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [onlineUsers, userData]);

  useEffect(() => {
    setUserData((user) => ({ ...user, online: isOnline }));
  }, [isOnline]);

  // To reset the selected state when the chatId changes
  useEffect(() => {
    setSelected(chatId === data._id);
  }, [chatId, data._id]);

  return (
    <>
      {userData && (
        <div
          className={`cursor-pointer ${
            selected
              ? "bg-white ml-2 rounded-l-lg dark:bg-tahiti-300"
              : "bg-tahiti-100 rounded-none dark:bg-tahiti-200"
          } rounded-l-lg text-black dark:text-white border-b-2 dark:border-b-gray-500 flex items-center`}
          onClick={() => getConversation(userData)}
        >
          <div className="flex-none p-3 relative">
            <span
              className={
                (isOnline ? "bg-green-500" : "bg-slate-700") +
                " rounded-full absolute left-0 w-3 h-3 ml-3 border-2 border-slate-400"
              }
            ></span>
            <img
              src={
                userData?.profilePicture
                  ? import.meta.env.VITE_REACT_PUBLIC_FOLDER +
                    userData.profilePicture
                  : person2
              }
              alt="profile photo"
              className="border-2 border-white dark:border-gray-500 rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
            />
          </div>
          <div className="relative flex-1 px-2">
            <p className="text-xs absolute right-3 top-0 py-1 text-gray-700 dark:text-gray-500">
              {data?.updatedAt ? formatDate(data.updatedAt) : ""}
            </p>
            <p className="text-lg font-bold pr-20 truncate">
              {userData?.firstname} {userData?.lastname}
            </p>
            <p className="text-sm pr-3 truncate">{data?.lastMessage ?? "@"}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatmate;
