import React, { useState, useEffect } from 'react'
import { Query } from 'appwrite'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'
import appwiteService from "../appwrite/config.js"

const AllPosts = () => {
    const [posts, setPosts] = useState([])

    const userData = useSelector((state) => state.auth.userData)
    useEffect(() => {
        appwiteService.getPosts([Query.equal("userId", `${userData.$id}`)]).then((posts) => {
            if (posts) {
                console.log("userData",userData);
                console.log(posts.documents);
                setPosts(posts.documents)
            }
        })
    }, [])


    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts