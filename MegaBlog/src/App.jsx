import { useState, useEffect } from 'react'
import './App.css'
import config from './config/config'
import {useDispatch} from 'react-redux'
import authService from './appwrite/AuthService'
import {login, logout} from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'


function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        // test by changing the userData variable here and in the slice page
        dispatch(() => login({userData}))
        
      } else {
        dispatch(() => logout())
      }
    })
    .finally(() => setLoading(false))

  }, [])



  return !loading ? (
    <div className='min-h-screen flex flex-wrap
    content-between bg-gray-200'>
      <div className='w-full block'>
          <Header />
          <main>
            {/* <Outlet /> */}
          </main>
          <Footer />
      </div>

    </div>
  ) : null;
}

export default App
