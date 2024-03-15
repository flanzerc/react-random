import React, {useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import appwriteConfService from '../appwrite/appwritePostService'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPostPage() {
    const [post, setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug) {
            appwriteConfService.getPostById(slug)
            .then((post) => {
                if(post) {
                    setPosts(post);
                }
            })

        } else {
            navigate("/")
        }

    }, [slug, navigate])

  return post ? ( 
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
    
  ) : 'null'
}