import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function AddChatMate() {
  return (
    <div className="relative p-2 lg:p-6">
      <div className="absolute inset-y-0 left-0 pl-4 lg:pl-9 flex items-center pointer-events-none">
        <AiOutlineSearch className="text-gray-600" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-lg border border-gray-300 pl-8 lg:pl-10 pr-4 py-2 focus:outline-none focus:ring focus:border-tahiti-150 dark:focus:border-gray-500"
      />
    </div>
  );
}

export default AddChatMate;
