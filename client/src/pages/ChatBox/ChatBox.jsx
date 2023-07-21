import React from "react";
import female from "../../assets/female2.png";
import ReceivedChat from "./ReceivedChat";
import SentChat from "./SentChat";

function ChatBox() {
  return (
    <div className=" lg:pl-0 p-3 w-full h-auto text-center font-poppins lg:w-7/12 lg:-mt-100 float-right">
      <div className=" p:3 lg:p-5 overflow-y-auto lg:h-96">
        <h1 className="font-bold text-3xl">Marj Faustino</h1>
        <span className="text-xxs mx-auto">Today 10:27am</span>

        <ReceivedChat />
        <SentChat />
        <div className="clear-both">
          <div className="h-auto mt-3 float-right">
            <p className="bg-tahiti-100 h-auto w-auto p-2 rounded-xl">What</p>
          </div>
        </div>
        <div className="clear-both">
          <div className="h-auto flex mt-3">
            <img
              src={female}
              alt="logo"
              className="border-2 border-white rounded-3xl h-8 w-8 lg:h-12 lg:w-12 mr-3"
            />
            <p className="bg-tahiti-150 h-auto w-auto p-2 rounded-xl">
              I'm here at the cafe.
            </p>
          </div>
        </div>
        <div className="clear-both">
          <div className="h-auto mt-3 float-right">
            <p className="bg-tahiti-100 h-auto w-auto p-2 rounded-xl">
              Ok, see you there.
            </p>
          </div>
        </div>

        <div className="clear-both">
          <div className="h-auto flex mt-3">
            <img
              src={female}
              alt="logo"
              className="border-2 border-white rounded-3xl h-8 w-8 lg:h-12 lg:w-12 mr-3"
            />
            <p className="bg-tahiti-150 h-auto w-auto p-2 rounded-xl">
              I'm here at the cafe.
            </p>
          </div>
        </div>
        <div className="clear-both">
          <div className="h-auto flex mt-3">
            <img
              src={female}
              alt="logo"
              className="border-2 border-white rounded-3xl h-8 w-8 lg:h-12 lg:w-12 mr-3"
            />
            <p className="bg-tahiti-150 h-auto w-auto p-2 rounded-xl">
              I'm here at the cafe.
            </p>
          </div>
        </div>
        <div className="clear-both">
          <div className="h-auto mt-3 float-right">
            <p className="bg-tahiti-100 h-auto w-auto p-2 rounded-xl">
              Ok, see you there.
            </p>
          </div>
        </div>
        <div className="clear-both">
          <div className="h-auto mt-3 float-right">
            <p className="bg-tahiti-100 h-auto w-auto p-2 rounded-xl">
              Ok, see you there.
            </p>
          </div>
        </div>
      </div>
      <div className="flex mt-3">
        <label
          htmlFor="image-upload"
          className="bg-tahiti-150 h-auto w-auto p-2 rounded-xl ml-2 cursor-pointer"
        >
          Attach Image
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
        />

        <textarea
          rows="2" // Set the number of visible rows to 2 (can be adjusted as needed)
          className="bg-tahiti-100 h-auto w-full rounded-xl pl-3 pr-10 py-2 text-black resize-none"
          placeholder="Type your reply..."
        />

        <button className="bg-tahiti-150 h-auto w-auto p-2 rounded-xl ml-2">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
