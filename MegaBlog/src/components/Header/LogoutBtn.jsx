import React from 'react'
import { useDispatch } from 'react-redux'
import appwriteAuthService from '../../appwrite/appwriteAuthService';
import { logout } from '../../store/authSlice'






export default function LogoutBtn() {

  const dispatch = useDispatch();
  const logoutHandler = () => {
    appwriteAuthService.logout()
    .then(() => {
        dispatch(logout())
    })
  }

  return (
    <button
      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
      >
      Logout
    </button>
  )
}
