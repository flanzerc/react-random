import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

export default function User() {
    // const [userData, setUserData] = useState([]);
    const userData = useLoaderData();
    const {id} = useParams();

    // useEffect( () => {
    //     // console.log('params', id);
    //     fetch("https://api.github.com/users/" + id)
    //     .then((response) => response.json())
    //     .then(data => {
    //         console.log(data.name);
    //         setUserData(data);
    //     })
    // }, []);

  return (
    <div className='text-center m-4 bg-gray-400 text-white p-4 text-3xl roudend-xl'>
        Github Followers for {userData.name} : {userData.followers}
        <img className='rounded-3xl' src={userData.avatar_url} width={150} />
    </div>
  )
}

// check if this is the right way to capture dynamic id from URL
export const githubInfoLoader = async (info) => {
  // console.log('inside', id.params.id);
  const response = await fetch('https://api.github.com/users/' + info.params.id);
  return response.json();
}
