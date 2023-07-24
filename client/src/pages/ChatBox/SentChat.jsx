import React from "react";

function SentChat({ data }) {
  return (
    <div className="clear-both">
      <div className="h-auto mt-3 float-right">
        <p className="bg-tahiti-100 h-auto w-auto rounded-xl p-2">
          {data.text}
        </p>
      </div>
    </div>
  );
}

export default SentChat;
