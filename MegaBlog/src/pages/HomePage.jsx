import React, {useEffect, useState} from 'react'
import appwriteConfService from '../appwrite/appwritePostService'
import { Container, PostCard } from '../components'
import { json } from 'react-router-dom'


export default function HomePage() {

    const [posts, setPosts] = useState([])
    // console.log('HomePage')

    useEffect(() => {
        appwriteConfService.getPosts()
        .then((posts) => {

                if(posts) {
                    setPosts(posts.documents)
                }   
                

            }
        )
    }, [])

    if(posts.length === 0) {
        return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h2 className='text-2xl font-bold hover:text-gray-200'>
                            Login to read posts
                        </h2>
                    </div>
                </div>

            </Container>
        </div>
      )

    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} 
                            className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
