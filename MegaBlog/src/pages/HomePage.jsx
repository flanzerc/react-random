import React, {useEffect, useState} from 'react'
import appwriteConfService from '../appwrite/appwritePostService'
import { Container, PostCard } from '../components'


export default function HomePage() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteConfService.getPosts()
        .then((posts) => (setPosts(posts)))
    }, [posts])

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
                                <PostCard post={post} />
                            </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
