import { useState } from 'react'
import UserContextProvider from './context/UserContext/UserContextProvider'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <h1>React MiniContext</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
