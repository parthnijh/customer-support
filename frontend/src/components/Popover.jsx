import React from "react";
import Chatui from "../Chatui"; // adjust path if needed

const ChatPopover = ({ value, setPopover }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-full h-full rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-50 flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Chat for: {value.title}
            </h2>
            <p className="text-sm text-gray-500">Ticket #{value.id}</p>
          </div>
          <button
            onClick={() => setPopover(false)}
            className="text-gray-500 hover:text-gray-800 transition text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <div className="w-full h-full overflow-hidden">
            <Chatui value={value} noInput={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopover;
