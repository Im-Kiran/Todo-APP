import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Task from './components/Task'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Task/>
    </>
  )
}

export default App
