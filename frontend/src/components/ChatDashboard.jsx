import React, { useState,useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import {FaRobot,FaUser} from "react-icons/fa"
const ChatDashboard = ({ value, noInput = false }) => {
  const user = useUser();
  const [messages, setMessages] = useState(value.messages || []);
  useEffect(() => {
  setMessages(value.messages || []);
}, [value.messages]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#0e1014] flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 text-gray-200">
      {/* Header */}
      {!noInput && (
        <div className="w-full max-w-3xl bg-[#151922] border border-[#2a3140] rounded-xl shadow-lg p-5 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-100 tracking-tight mb-1">
              Customer Chat
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              Connected to Support Bot 🤖
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Online</span>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm ring-2 ring-green-700/50"></div>
          </div>
        </div>
      )}

      {/* Chat Box */}
      <div className="flex-1 w-full max-w-3xl bg-[#151922] border border-[#2a3140] rounded-xl shadow-lg flex flex-col justify-between overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-[#2a3140] scrollbar-track-[#0e1014]">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-10">
              No messages yet. Start the conversation below 👇
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={` gap-2 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-center  justify-center w-8 h-8 rounded-full bg-[#1c2230] border border-[#2a3140]">
                  {msg.sender === "bot" ? (
                    <FaRobot className="text-indigo-400 text-lg" />
                  ) : (
                    <FaUser className="text-gray-400 text-lg" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 text-sm leading-relaxed max-w-[70%] rounded-xl ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                      : "bg-[#1c2230] text-gray-200 rounded-bl-none border border-[#2a3140]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Box */}
        {!noInput && (
          <div className="border-t border-[#2a3140] bg-[#0e1014]/60 p-4 flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 rounded-lg text-sm bg-[#151922] text-gray-200 placeholder-gray-500 border border-[#2a3140] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
            />
            <button
              onClick={handleSend}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-indigo-700/30"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;
