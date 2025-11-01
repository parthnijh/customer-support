import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";const Chatui = ({value,noInput=false}) => {
    const user =useUser()
    console.log(user.user.id)
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey there 👋, how can I assist you today?" },
    { sender: "user", text: "Hi, I have an issue with my order." },
    { sender: "bot", text: "Got it! Can you please share your order ID?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: "Sure! Checking details..." };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {!noInput && <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-200/60 p-5 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight mb-1">
            Customer Chat
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Connected to Support Bot 🤖
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Online</span>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm ring-2 ring-green-200"></div>
        </div>
      </div>
    }

      {/* Chat Area */}
      <div className="flex-1 w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-200/60 flex flex-col justify-between overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 text-sm leading-relaxed max-w-[70%] rounded-xl ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                    : "bg-gray-100 text-gray-800 rounded-bl-none shadow-sm border border-gray-200/50"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        {!noInput &&<div className="border-t border-gray-200 bg-gray-50/50 p-4 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white text-black"
          />
          <button
            onClick={handleSend}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Send
          </button>
        </div>
        }
      </div>
        
    </div>
  );
};

export default Chatui;