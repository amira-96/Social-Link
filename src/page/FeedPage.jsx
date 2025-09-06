
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

//usequery
  const {data, refetch,isFetching,isLoading} =useQuery({
  queryKey:["posts"], 
  queryFn: getAllPostsApi
 })

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
                setPost={()=>{}}
                posts={data?.data.posts}
                key={post.id}
                commentsLimt={2}
                
                
                />
            ))
           }
    </div>
  );
}
//     const [post, setPost] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);


// async function getAllPosts() {
//     setIsLoading(true);
//     try {
//         const data = await getAllPostsApi();
//         if (data.message === "success") {
//             // قم بتصحيح المسار من data.data.posts إلى data.posts
//             const validPosts = data.posts.filter(p => p && p.user);
//             setPost(validPosts.reverse());
//         }
//     } catch (error) {
//         console.error("Failed to fetch posts:", error);
//     } finally {
//         setIsLoading(false);
//     }
// }
//   useEffect(() => {
//     getAllPosts();
//   },[])



//     return (
//         <div className='grid gap-3 max-w-2xl mx-auto my-10'>
//             {/* نمرر الدالة getAllPosts للمكونين */}
//             <MakePost getAllPosts={getAllPosts} />

//             {
//             isLoading ? 
//                 <LoadingPage />
//                  :
//              (
//                 post.length > 0 ? (
//                     post.map((post) => (
//                         <Posts  getAllPosts={ getAllPosts} key={post.id} post={post} commentsLimt={1} />
//                     ))
//                 ) : (
//                     <div className="text-center text-gray-500 mt-10">

//                     </div>
//                 )
//             )}
//         </div>
//     );
// }

