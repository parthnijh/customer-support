import React, { useState, useEffect } from "react";
import Popover from "./components/Popover";
import ReactMarkdown from "react-markdown"
import SummaryPopover from "./components/SummaryPopover";
import FileUploader from "./FileUploader";
const Dashboard = () => {
  const [popover, setPopover] = useState(false);
  const [value, setValue] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [summary,setSummary]=useState("")
  const [summarypopover,setSummaryPopover]=useState(false)
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/users");
        const data = await response.json();
        setTickets(data || []);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    getTickets();
  }, []);


    const getSummary = async () => {
      try {
        if(!value) return;
       setLoadingSummary(true);
       
        const response = await fetch("http://127.0.0.1:5000/api/summary",
          {
            method:"POST",
            headers:{
            "Content-Type": "application/json",
          },
            body:JSON.stringify({"messages":value.messages})
          }
        );
        const data = await response.json();
        setSummary(data.result || "");
        console.log(data.result)
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
      finally{
        setLoadingSummary(false);
      }
    };
  
  

  


  const filteredTickets = tickets.filter((t) =>
    (t.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen min-w-screen bg-[#0e1014] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 text-gray-200">
      {/* Header Section */}
      <div className="w-full max-w-7xl mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-100 tracking-tight">
              Support Dashboard
            </h1>
            <p className="text-gray-400 text-sm font-medium max-w-md">
              Manage and track customer support tickets in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
               
              </svg>
              
            </div>
           <FileUploader />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            {
              label: "Total Tickets",
              value: filteredTickets.length,
              color: "text-indigo-400",
            },
            {
              label: "Open",
              value: filteredTickets.filter((t) => t.status === "Open").length,
              color: "text-teal-400",
            },
            {
              label: "In Progress",
              value: filteredTickets.filter(
                (t) => t.status === "In Progress"
              ).length,
              color: "text-amber-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#151922] rounded-xl p-4 border border-[#2a3140] shadow-sm"
            >
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
              <div className={`text-2xl font-bold mt-1 ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="w-full max-w-7xl bg-[#151922] rounded-xl shadow-xl border border-[#2a3140] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-indigo-700/40 text-gray-200">
              <tr>
                {["ID", "Email", "Created","Updated","Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-300"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a3140]">
              {
              
                filteredTickets.map((row) => (
                  <tr
                    key={row.ticket_id}
                    className="hover:bg-[#1c2230] transition-colors duration-150 cursor-pointer group text-center"
                    
                  >
                    <td className="px-6 py-4 font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors" onClick={() => {
                      setPopover(true);
                      setValue(row);
                      
                    }}>
                      #{row.ticket_id || "N/A"}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-300 group-hover:text-indigo-400 transition-colors">
                      {row.email || "-"}
                    </td>
                   
                   
                   
                    <td className="px-6 py-4 text-center text-gray-500 text-xs font-medium">
                      {row.createdAt || "N/A"}
                    </td>
                     <td className="px-6 py-4 text-center text-gray-500 text-xs font-medium">
                      {row.updatedAt || row.createdAt}
                    </td>
                    <td><button onClick={()=>{getSummary(), setSummaryPopover(true),setSummary("");}}>Summarise</button></td>
                  </tr>
                
              ))
            }
            </tbody>
          </table>
        </div>

        {popover && <Popover value={value} setPopover={setPopover} />}

        {summarypopover && <SummaryPopover value={summary} setPopover={setSummaryPopover} loading={loadingSummary} />}
      </div>
    </div>
  );
};

export default Dashboard;
