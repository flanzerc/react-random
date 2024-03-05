import { useState, useEffect } from 'react'
import './App.css'
import config from './config/config'
import {useDispatch} from 'react-redux'
import authService from './appwrite/authService'
import {login, logout} from './store/authSlice'


function App() {

  const [loading, setLoading] = useState(true)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   authService.getCurrentUser()
  //   .then((userData) => {
  //     if (userData) {
  //       // test by changing the userData variable here and in the slice page
  //       dispatch(() => login({userData}))

  //     } else {
  //       dispatch(() => logout())
  //     }
  //   })
  //   .finally(() => setLoading(false))

  // }, [])



  return (
    <>
        <h1 style={{color: "white"}}>Blog With AppWrite</h1>        
    </>
  )
}

export default App
