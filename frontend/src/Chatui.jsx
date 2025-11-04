import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/clerk-react";
import {FaRobot,FaUser}from "react-icons/fa"
const Chatui = () => {
  const user = useUser();
  console.log(user.user.id);
  console.log(user.user.emailAddresses[0].emailAddress)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  let called = false;

  const getUsers = async () => {
    if (called) return; // prevent second run
    called = true;
    try {
      const response = await fetch("http://127.0.0.1:5000/api/messsages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          user_id: user.user.id,
          email: user.user.emailAddresses[0].emailAddress 
        }),
      });
      const data = await response.json();
      console.log("Fetched users:", data);
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  if (user?.user?.id) getUsers();
}, [user?.user?.id]);


  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    try {
      const payload = {
        query: input,
        chat_history: [...messages, { sender: "user", text: input }],
        user_id: user.user.id,
      };
      const response = await fetch("http://127.0.0.1:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Fetched answer", data);
      if (data) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-[#0e1014] via-[#151922] to-[#0e1014] flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl bg-[#151922]/80 backdrop-blur-xl border border-[#2a3140]/60 rounded-2xl shadow-xl p-5 mb-6 flex items-center justify-between text-gray-200">
        <div>
          <h1 className="text-xl font-semibold text-gray-100 tracking-tight mb-1">
            Customer Chat
          </h1>
          <p className="text-sm text-gray-400">Connected to Support Bot 🤖</p>
          <div className="mt-2">
            <SignOutButton className="text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20 transition-all" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">Online</span>
          <div className="w-3 h-3 bg-green-500 rounded-full ring-2 ring-green-300/20"></div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 w-full max-w-4xl bg-[#151922]/70 backdrop-blur-lg border border-[#2a3140]/60 rounded-2xl shadow-lg flex flex-col justify-between overflow-hidden text-gray-100">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-none scroll-smooth">
          {messages.length > 0 &&
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
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
                      : "bg-[#1b1f2a] text-gray-200 rounded-bl-none border border-[#2a3140]/70"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
        </div>

        {/* Input Box */}
        <div className="border-t border-[#2a3140]/70 bg-[#0e1014]/80 p-4 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 rounded-lg text-sm bg-[#151922] border border-[#2a3140]/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-100 placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 transition-all text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatui;
