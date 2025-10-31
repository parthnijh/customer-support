import React from 'react'
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
const Popover = ({value,setPopover}) => {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-gray-900 text-white rounded-lg shadow-lg p-6 z-50 w-3/4 h-4/5'>
        <div className='flex justify-start'>
            <div><button onClick={()=>setPopover(false)}>Close</button></div>

        </div>
        <div className='flex flex-col justify-center items-center'>
            <h1>Details</h1>
            {value.status}
        </div>
        
    </div>
  )
}

export default Popover;