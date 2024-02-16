import React, {useContext} from 'react'
import userContext from '../context/UserContext/UserContext'

function Profile() {
    const {user} = useContext(userContext);

    if(!user) {
        return (
            <div>Please Login</div>
        )
    }

    return (
        <div>Welcome User: {user.username}</div>
    )
}

export default Profile
