import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Dashboard'
import Popover from './components/Popover'
import {Routes,Router,Route} from "react-router-dom"
import Chatui from './Chatui'
function App() {
  const [count, setCount] = useState(0)

  return (
   
      <Routes>
      <Route path='/' element={<Dashboard />}></Route>
      <Route path='/admin/1' element={<Dashboard/>}></Route>
      <Route path='/user' element={<Chatui/>}></Route>
      </Routes>
      
            
    
  )
}

export default App
