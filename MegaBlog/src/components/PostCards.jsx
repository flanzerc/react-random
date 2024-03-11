import React from 'react'
import appwritePostService from "../appwrite/appwritePostService"
import {Link} from 'react-router-dom'

export default function PostCards({$id, title, featuredImage}) {
  return (
    <Link to={"/post/${$id}"}>
        <div className='w-full bg-gray-200 rounded-xl p-4'>
            <div className='w-full justify-centermb-4'>
                <img src={appwritePostService.getImagePreview(featuredImage)} alt={title} 
                className='rounded-xl '/>

            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
    )
}
