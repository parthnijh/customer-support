import React, { useState } from "react";
import Popover from "./components/Popover";

const tickets = [
  {
    id: 1,
    title: "Login button not working",
    status: "Open",
    priority: "High",
    assignedTo: "John Doe",
    description: "Users are unable to log in using Google OAuth on the homepage.",
    createdAt: "2025-10-28",
  },
  {
    id: 2,
    title: "Payment gateway timeout",
    status: "In Progress",
    priority: "Critical",
    assignedTo: "Priya Sharma",
    description: "Payment requests via Stripe API are timing out for some users.",
    createdAt: "2025-10-27",
  },
  {
    id: 3,
    title: "Dark mode toggle bug",
    status: "Closed",
    priority: "Low",
    assignedTo: "Rahul Mehta",
    description: "Dark mode toggle not persisting between page reloads.",
    createdAt: "2025-10-20",
  },
  {
    id: 4,
    title: "Dashboard slow loading",
    status: "Open",
    priority: "Medium",
    assignedTo: "Sara Ali",
    description: "Dashboard takes ~10s to load due to unoptimized queries.",
    createdAt: "2025-10-25",
  },
  {
    id: 5,
    title: "Email notifications not sent",
    status: "Resolved",
    priority: "High",
    assignedTo: "Arjun Patel",
    description: "Password reset and ticket update emails not being delivered.",
    createdAt: "2025-10-24",
  },
];

const Dashboard = () => {
    const [popover,setPopover]=useState(false);
    const [value,setValue]=useState("");
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🎟️ Ticket Dashboard
      </h1>

      <div className="flex justify-center">
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white w-full max-w-6xl">
             
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-600 w-full text-center text-white uppercase text-sm">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Title</th>
                
              </tr>
            </thead>

            <tbody>
               
              {tickets.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-blue-50 transition-colors duration-200 z-[-1]"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{row.id}</td>
                  <td className="px-6 py-4 w-full text-center "onClick={()=>{setPopover(true),setValue(row)}}>{row.title}</td>
                 
                </tr>
                
              ))}
            </tbody>
          </table>
          {popover && <Popover value={value} setPopover={setPopover} />}
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
