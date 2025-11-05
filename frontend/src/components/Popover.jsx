import React from "react";
import ChatDashboard from "./ChatDashboard";
const ChatPopover = ({ value, setPopover }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="w-full h-full max-w-5xl max-h-[90vh] bg-[#151922]/80 backdrop-blur-xl border border-[#2a3140]/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-200 ">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#2a3140]/50 bg-[#0e1014]/70 backdrop-blur-lg flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Chat for: <span className="text-indigo-400">{value.email}</span>
            </h2>
            <p className="text-sm text-gray-400">Ticket #{value.ticket_id}</p>
          </div>
          <button
            onClick={() => setPopover(false)}
            className="text-gray-400 hover:text-white transition text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex justify-center items-center flex-1 bg-gradient-to-b from-[#0e1014] via-[#151922] to-[#0e1014] overflow-hidden hide-scrollbar">
          {/* Scrollable Wrapper */}
          <div className="w-full h-full overflow-y-auto  scroll-smooth flex justify-center hide-scrollbar">
            <ChatDashboard value={value} noInput={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopover;
