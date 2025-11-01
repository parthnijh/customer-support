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
];

const Dashboard = () => {
  const [popover, setPopover] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="w-full max-w-7xl mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
              Support Dashboard
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Manage customer support tickets and inquiries
            </p>
          </div>
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Ticket
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg border border-gray-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {tickets.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 last:border-none hover:bg-indigo-50/30 transition-colors duration-150 cursor-pointer group"
                  onClick={() => {
                    setPopover(true);
                    setValue(row);
                  }}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                    #{row.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                    {row.title}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      row.status === "Open" ? "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20" :
                      row.status === "In Progress" ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20" :
                      "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      row.priority === "Critical" ? "bg-red-50 text-red-700 ring-1 ring-red-600/30" :
                      row.priority === "High" ? "bg-orange-50 text-orange-700 ring-1 ring-orange-600/30" :
                      "bg-gray-50 text-gray-600 ring-1 ring-gray-600/20"
                    }`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-700">{row.assignedTo}</td>
                  <td className="px-6 py-4 text-center text-gray-500 text-xs font-medium">{row.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {popover && <Popover value={value} setPopover={setPopover} />}
      </div>
    </div>
  );
};

export default Dashboard;