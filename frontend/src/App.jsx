import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Dashboard'
import Popover from './components/Popover'
import {Routes,Router,Route} from "react-router-dom"
import Chatui from './Chatui'
import FileUploader from './FileUploader'
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
function App() {
  
  const [count, setCount] = useState(0)

  return (
   
      <Routes>
      <Route path='/' element={<SignedOut>
              <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Please sign in to access the chat</h2>
             <SignIn 
  forceRedirectUrl="/user"
  signUpForceRedirectUrl="/user"
/>


              </div>
            </SignedOut>}></Route>
      <Route path='/admin/1' element={<Dashboard/>}></Route>
     <Route
        path='/user'
        element={
          <>
            <SignedIn>
              <Chatui />
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Please sign in to access the chat</h2>
             <SignIn 
  forceRedirectUrl="/user"
  signUpForceRedirectUrl="/user"
/>


              </div>
            </SignedOut>
          </>
        }
      />

      <Route path='/upload' element={<FileUploader />}></Route>
      </Routes>
      
            
    
  )
}

export default App
