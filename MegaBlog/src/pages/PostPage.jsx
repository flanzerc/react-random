import React, {useState, useEffect} from 'react'
import appwriteConfService from '../appwrite/appwritePostService'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostCard } from '../components'
import { UseSelector, useSelector } from 'react-redux'
import parse from "html-react-parser"



export default function PostPage() {

    const[post, setPost] = useState([])
    const navigate = useNavigate()
    const {slug} = useParams()

    const userData = useSelector((state) => (state.auth.userData))
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if(slug) {
            appwriteConfService.getPostById(slug)
            .then((post) => {
                if(post) setPost(post)
                else navigate("/")
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])


    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteConfService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
