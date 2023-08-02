import { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/UserRequest";
import { Link, useParams } from "react-router-dom";
import blankAvatar from "../../assets/blankAvatar.png";
import person2 from "../../assets/person2.png";
import { formatDate } from "../../util/helper";
import { useChatContext } from "../../context/ChatContext";

function Member({ data, currentUserId, findChat }) {
  const { chatId } = useParams();
  const { onlineUsers, setChatmateInfo, setMembers } = useChatContext();
  const [memberData, setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(true);
  const [online, setOnline] = useState(false);
  const timeoutIdRef = useRef();

  const getMemberData = async () => {
    try {
      const userId = data.members.find((id) => id !== currentUserId);
      const response = await getUser(userId);
      setMemberData(response);
      setLoading(false);
      setMembers((prev) => {
        const addId = { ...response, chatId: data._id };
        if (prev && prev.length > 0) {
          const exist = prev.find((id) => id.chatId === data._id);
          if (!exist) {
            return [...prev, addId];
          }
          return [...prev];
        } else {
          return [addId];
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMemberData();
  }, []);

  useEffect(() => {
    setSelected(chatId === data._id);
  }, [data._id, chatId]);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const active = onlineUsers.find((id) => userId === id.userId);
    if (active) {
      setOnline(true);
      clearTimeout(timeoutIdRef.current);
    } else {
      const timeoutId = setTimeout(() => {
        setOnline(false);
      }, 30000);
      timeoutIdRef.current = timeoutId;
    }
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [onlineUsers, currentUserId]);

  if (loading) {
    return <div>...Loading</div>;
  }

  const fullName = `${memberData?.firstname} ${memberData?.lastname}`;
  const isMatching = fullName.toLowerCase().includes(findChat.toLowerCase());

  return (
    <>
      {memberData && isMatching && (
        <Link to={`/chat/${data._id}`} onClick={() =>
          document.querySelector("section.chatbox").classList.add("show")
        }>
          <div
            className={`cursor-pointer ${selected
                ? "bg-white ml-2 rounded-l-lg dark:bg-tahiti-300"
                : "bg-tahiti-100 rounded-none dark:bg-tahiti-200"
              } rounded-l-lg text-black dark:text-white flex items-center`}
          >
            <div className="flex-none p-3 relative">
              <span
                className={
                  (online ? "bg-green-500" : "bg-slate-700") +
                  " rounded-full absolute left-0 w-3 h-3 ml-3 border-2 border-slate-400"
                }
              ></span>
              <img
                src={memberData?.profilePicture || blankAvatar}
                alt="profile photo"
                className="border-2 border-white dark:border-gray-500 rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
              />
            </div>
            <div className="relative flex-1 px-2">
              <p className="text-xs absolute right-3 top-0 py-1 text-gray-700 dark:text-gray-500">
                {data?.updatedAt ? formatDate(data.updatedAt) : ""}
              </p>
              <p className="text-lg font-bold pr-20 truncate">
                {memberData?.firstname} {memberData?.lastname}
              </p>
              <p className="text-sm pr-3 truncate">
                {data?.lastMessage ?? "@"}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default Member;
