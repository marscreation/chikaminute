import React from "react";
import { FiSearch } from "react-icons/fi";
import { AiFillMessage } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import PinnedConversation from "./PinnedConversation";
import Conversation from "./Conversation";

function Home() {
  return (
    <>
      <div className="h-auto w-screen text-black bg-tahiti-100 lg:bg-white rounded-xl">
        <div className="h-20 w-full bg-white rounded-xl p-2 flex">
          <AiFillMessage className="h-8 w-8 lg:h-16 lg:w-16 mr-10 ml-2 text-tahiti-150 lg:ml-60 lg:mr-40" />
          <label className="font-bold text-3xl lg:mr-60 lg:mt-3">Message</label>
          <BsThreeDotsVertical className="h-8 w-6 ml-20 lg:ml-96 lg:mt-4" />
        </div>
        <div className="pl-2 lg:pl-10 lg:pr-0 lg:pt-5 ml-1 mt-2 lg:mt-0 w-full h-auto text-sm text-slate-500 lg:bg-tahiti-100 lg:w-2/5">
          <div className="flex -mt-16 ml-1 lg:-mt-12 w-full h-6">
            <input
              type="text"
              className="bg-tahiti-100 lg:bg-white h-6 mt-6 -ml-3 w-full rounded-xl pl-10 lg:pl-24 lg:w-11/12 lg:mt-12  text-black"
            />
            <FiSearch className="mt-7 -ml-72 lg:-ml-96 lg:mt-12 lg:h-5" />
          </div>

          <PinnedConversation />
          <Conversation />
        </div>
      </div>
    </>
  );
}

export default Home;
