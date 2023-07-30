import React from "react";
import { TiUserAdd } from "react-icons/ti";

function UserContact({ img, firstname, lastname, onChatCreate }) {
  return (
    <div className="justify-between w-full p-2 pr-0 flex rounded-lg mb-2">
      <div className="flex">
        <img
          src={img}
          alt={`${firstname}'s avatar`}
          className="border-2 border-white dark:border-gray-500 rounded-3xl mr-2 h-10 w-10 lg:h-12 lg:w-12"
        />
        <h2 className="text-lg mt-1 lg:mt-2 pr-1">{firstname}</h2>
        <h2 className="text-lg lg:mt-2 mt-1">{lastname}</h2>
      </div>
      <button onClick={onChatCreate}>
        <TiUserAdd className=" h-9 w-9 mr-2 p-1 rounded-lg border hover:bg-gray-100 hover:text-tahiti-150 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-tahiti-200 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" />
      </button>
    </div>
  );
}

export default UserContact;
