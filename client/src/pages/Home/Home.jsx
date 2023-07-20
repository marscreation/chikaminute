import React from "react";
import { FiSearch } from "react-icons/fi";
import { AiFillMessage } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import PinnedConversation from "./PinnedConversation";
import Conversation from "./Conversation";

function Home() {
  return (
    <>
      <div className="h-screen w-100 text-black pt-12 lg:pt-0 font-mono">
        <div className="h-auto w-5/6 lg:h-screen lg:w-screen border-2 border-slate-500 lg:border-0 bg-green-50 lg:bg-white rounded-xl mx-auto">
          <div className="h-20 w-full bg-white rounded-xl p-2 flex">
            <div className="flex">
              <AiFillMessage className="h-8 w-8 lg:h-16 lg:w-16 mr-3 ml-2 text-sky-500 lg:ml-60 lg:mr-40" />
              <label className="font-bold text-3xl lg:mr-60 lg:mt-3">
                Message
              </label>
              <RxHamburgerMenu className="h-8 w-6 ml-10 lg:ml-96 lg:mt-4" />
            </div>
          </div>
          <div className="pl-2 lg:pl-10 lg:pr-0 lg:pt-5 mt-2 lg:mt-0 w-full h-auto text-sm text-slate-500 lg:bg-green-50 lg:w-2/5">
            <div className="flex -mt-16 ml-1 lg:-mt-12 w-full h-6">
              <input
                type="text"
                className="bg-green-50 lg:bg-white h-6 mt-6 -ml-3 w-64 rounded-xl pl-10 lg:pl-8 lg:w-96 lg:mt-12 lg:ml-7 "
              />
              <FiSearch className="mt-7 -ml-60 lg:mt-12 lg:-ml-96 lg:h-5 lg:-mr-20" />
            </div>

            <PinnedConversation />
            <Conversation />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
