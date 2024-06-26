import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    // console.log('AuthLayout');

    useEffect(() => {
        // in case user send fasle in authstatus when the authetication is true from the store
        // CAN THIS BE BETTER ??? 
        // console.log('authentication', authentication);
        if(authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            
            navigate('/')
        }
        setLoader(false)

    }, [authStatus, navigate, authentication])

  return loader ? <h2>Loading ...</h2> : <>{children}</>
}
