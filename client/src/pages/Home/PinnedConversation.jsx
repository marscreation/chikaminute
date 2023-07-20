import React from "react";
import hehe from "../../assets/hehe.jpg";
import person from "../../assets/person.png";
import { TbPinned } from "react-icons/tb";

function PinnedConversation() {
  return (
    <div className="h-5/6 w-full mt-8">
      <div className="w-full  mt-10 lg:mt-0 -ml-2 h-7 flex">
        <TbPinned className="h-6 lg:ml-0 lg:mt-10" />
        <label className="font-bold mt-0.5 ml-2 text-slate-500 lg:mt-11 lg:ml-4">
          Pinned Conversations
        </label>
      </div>
      <div className="bg-white h-16 p-3 w-full rounded-l-xl text-black mb-3 lg:mt-10">
        <img
          src={hehe}
          alt="logo"
          className="border-2 border-white rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
        />
        <p className="text-sm font-bold -mt-10 ml-12 lg:ml-16 lg:-mt-12">
          Marj Faustino
        </p>
        <p className="text-xs -mt-5 mr-1 float-right">11:11pm</p>
        <p className="text-sm ml-12 mt-2 lg:ml-16">Hi, how are you today?</p>
      </div>
      <div className=" h-16 p-3 w-full rounded-l-xl text-black mb-2">
        <img
          src={person}
          alt="logo"
          className="border-2 border-white rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
        />
        <p className="text-sm font-bold -mt-10 ml-12 lg:ml-16 lg:-mt-12">
          Mars
        </p>
        <p className="text-xs -mt-5 mr-1 float-right">10:41am</p>
        <p className="text-sm ml-12 mt-2 lg:ml-16">No</p>
      </div>
    </div>
  );
}

export default PinnedConversation;
