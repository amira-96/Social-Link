

import React, { useContext, useEffect, useState } from 'react';
import { getAllPostsApi } from '../Services/PostServices';
import Posts from '../Components/Posts/Posts.jsx';
import LoadingPage from '../page/LoadingPage.jsx'
import MakePost from '../Components/Posts/MakePost.jsx'
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Spinner } from '@heroui/react';
import { AppBlurContext } from '../Context/AppBlurContext.jsx';
import PostDetailsPage from './PostDetails.jsx';

export default function FeedPage() {
    const [posts, setPosts] = useState([]);
   const {data, refetch,isFetching,isLoading} =useQuery({
    queryKey:["posts"], 
    queryFn: getAllPostsApi
   })


const {showModal}=useContext(AppBlurContext)


    return (
        <div 
        
        className='grid gap-3 max-w-2xl mx-auto my-10'>
            <MakePost getAllPosts={refetch} />
            {isFetching && !isLoading}
           {
            isLoading?
            <LoadingPage/>
            :
            data?.data.posts.map((post)=>(

                <Posts
                post={post}
                getAllPosts={refetch}
                setPosts={()=>{}}
                posts={data?.data.posts}
                key={post.id}
                commentsLimt={2}
                
                
                />
            ))
           }
        </div>
    );
}

