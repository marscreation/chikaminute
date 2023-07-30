import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserData";
import { userChats } from "../../api/ChatRequest";
import Member from "../Member/Member";
import { useChatContext } from "../../context/ChatContext";

function Channels({ findChat }) {
  const user = useUserContext();
  const { setChats, chats } = useChatContext();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadChannels = async () => {
    try {
      const data = await userChats(user?._id);
      setChannels(data);
      setLoading(false);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadChannels();
  }, [user]);

  useEffect(() => {
    setChannels(chats);
  }, [chats]);

  if (loading) {
    return (
      <div className="dark:text-slate-600 font-extrabold text-2xl h-full flex place-content-center">
        ...Loading
      </div>
    );
  }

  if (!channels) {
    return (
      <div className="dark:text-slate-600 font-extrabold text-2xl h-full flex place-items-center place-content-center">
        No Conversation Found
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="font-bold p-2 text-slate-500 dark:text-slate-300">
        Conversation
      </div>
      <div>
        {channels.map((channel) => (
          <Member
            key={channel._id}
            data={channel}
            currentUserId={user._id}
            findChat={findChat}
          />
        ))}
      </div>
    </div>
  );
}

export default Channels;
