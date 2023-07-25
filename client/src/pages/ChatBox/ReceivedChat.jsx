import React from "react";
import female from "../../assets/female2.png";

function ReceivedChat({ data }) {
  return (
    <div className="clear-both">
      <div className="h-auto flex mt-3">
        <img
          src={female}
          alt="logo"
          className="border-2 border-white dark:border-gray-500 rounded-3xl h-8 w-8 lg:h-12 lg:w-12 mr-3"
        />
        <p className="bg-tahiti-150 dark:bg-tahiti-200 dark:text-white h-auto w-auto p-2 rounded-xl">
          {data.text}
        </p>
      </div>
    </div>
  );
}

export default ReceivedChat;
