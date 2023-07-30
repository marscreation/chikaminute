import React from "react";
import { TiUserAdd } from "react-icons/ti";

function UserContact({ img, firstname, lastname, onChatCreate }) {
  return (
    <div className="border-solid border-4">
      <img
        src={img}
        alt={`${firstname}'s avatar`}
        className="border-2 border-white dark:border-gray-500 rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
      />
      <h2 className="text-lg font-bold pr-20">{firstname}</h2>
      <h2 className="text-lg font-bold pr-20">{lastname}</h2>
      <button onClick={onChatCreate}>
        <TiUserAdd className=" h-9 w-9 mr-2 p-1 rounded-lg border hover:bg-gray-100 hover:text-tahiti-150 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" />
      </button>
    </div>
  );
}

export default UserContact;
