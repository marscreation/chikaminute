import React from "react";
import hehe from "../../assets/hehe.jpg";
import person from "../../assets/person.png";
import person2 from "../../assets/person2.png";
import female from "../../assets/female.png";
import female2 from "../../assets/female2.png";
import { FiSearch } from "react-icons/fi";
import { TbPinned } from "react-icons/tb";
import { AiFillMessage } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import PinnedConversation from "./PinnedConversation";

function Conversation() {
  return (
    <div className=" h-5/6 w-full -mt-10 lg:-mt-16">
      <div className="w-full  mt-10 -ml-3 h-7 flex">
        <label className="font-bold mt-0.5 ml-2 text-slate-500 lg:mt-11 lg:ml-4">
          Today
        </label>
      </div>
      <div className="h-16 p-3 w-full rounded-l-xl text-black mb-3 lg:mt-10">
        <img
          src={person2}
          alt="logo"
          className="border-2 border-white rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
        />
        <p className="text-sm font-bold -mt-10 ml-12 lg:ml-16 lg:-mt-12">Jet</p>
        <p className="text-xs -mt-5 mr-1 float-right text-gray-700">10:30pm</p>
        <p className="text-sm ml-12 mt-2 lg:ml-16">Hello?</p>
      </div>
      <div className=" h-16 p-3 w-full rounded-l-xl text-black mb-2">
        <img
          src={female2}
          alt="logo"
          className="border-2 border-white rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
        />
        <p className="text-sm font-bold -mt-10 ml-12 lg:ml-16 lg:-mt-12">
          Best Friend
        </p>
        <p className="text-xs -mt-5 mr-1 float-right text-gray-700">06:15am</p>
        <p className="text-sm ml-12 mt-2 lg:ml-16">Thank you, bff!</p>
      </div>
      <div className=" h-16 p-3 w-full rounded-l-xl text-black mb-2">
        <img
          src={female}
          alt="logo"
          className="border-2 border-white rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
        />
        <p className="text-sm font-bold -mt-10 ml-12 lg:ml-16 lg:-mt-12">
          Mama
        </p>
        <p className="text-xs -mt-5 mr-1 float-right text-gray-700">03:12pm</p>
        <p className="text-sm ml-12 mt-2 lg:ml-16">Ok</p>
      </div>
      <div className=" h-16 p-3 w-full rounded-l-xl text-black mb-2">
        <img
          src={female}
          alt="logo"
          className="border-2 border-white rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
        />
        <p className="text-sm font-bold -mt-10 ml-12 lg:ml-16 lg:-mt-12">
          Mary
        </p>
        <p className="text-xs -mt-5 mr-1 float-right text-gray-700">03:12pm</p>
        <p className="text-sm ml-12 mt-2 lg:ml-16">HAHAHAHA</p>
      </div>
    </div>
  );
}

export default Conversation;
