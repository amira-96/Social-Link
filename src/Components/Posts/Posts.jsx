

import React, { useContext, useState } from "react";
import Comment from "../../Components/Comment/Comment.jsx";
import CardHeader from "../../Components/Posts/CardHeader.jsx";
import PostBody from "../../Components/Posts/PostBody.jsx";
import PostFooter from "../../Components/Posts/PostFooter.jsx";
import PostAction from "../../Components/Posts/PostAction.jsx";
import {Button,addToast,useDisclosure} from "@heroui/react";
import { authContext } from "../../Context/authcontex.jsx";
import { deletPostsApi, updatePostApi } from "../../Services/PostServices.js";
import CreateComment from "../../Components/Posts/CreateComment.jsx";
import CardDropDown from "../../Components/CardDropdown/CardDropdown.jsx";
import CardModle from "../../Components/CardDropdown/CardModle.jsx";

export default function Post({post,commentsLimt,getAllPosts,setPost,handlFileInputImage}) {
//    if (!post || !post.user) {
// return null; // لا تعرض أي شيء إذا كان المنشور أو المستخدم الخاص به غير موجود
//  }
  const [visibleComments, setVisibleComments] = useState(2);
  const [CommentContent, setCommentContent] = useState("");
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isPostDelete, setIsPostDelete] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [IsInUpdateMode, setIsInUpdateMode] = useState(false);
  const [NewPostContent, setNewPostContent] = useState(post.body);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imagPreview, setImagePreview] = useState("");
  const [NewImageFile, setNewImageFile] = useState(null);

  // loade more comment

  function loadMoreComments() {
    setIsCommentsLoading(true);
    setTimeout(() => {
      setVisibleComments(visibleComments + 2);
      setIsCommentsLoading(false);
    }, 500);
  }
  // update posts
  async function handleUpdatePosts() {
    //function to update post//
    setIsUpdating(true);
    
    // إنشاء FormData لإرسال الملفات والبيانات
    const formData = new FormData();
    if (NewPostContent) {
      formData.append("body", NewPostContent);
    }
    if (NewImageFile) {
      formData.append("image", NewImageFile);
    }

    const response = await updatePostApi(post.id, formData);
    if (response.message == "success") {
      await getAllPosts();
      setIsInUpdateMode(false);
      
    }
    setIsUpdating(false);
     addToast({
              title: "success",
              description:"post update successfuly",
              timeout: 2000,
              color: "success",
            });
  }


  // access
  const { userData } = useContext(authContext);

  async function handelDeletPosts(onClose) {
    setIsPostDelete(true);
    const response = await deletPostsApi(post._id);
    if (response.message == "success") {
      await getAllPosts();
      setIsPostDelete(false);
      onClose();
      addToast({
        title: "post deleted successfuly",
        timeout: 2000,
        color: "success",
      });
    }
    // console.log(response);
  }


  return (
    <div  className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-10 ">
      {IsInUpdateMode ? (
        // هذا هو كود وضع التحديث
        <div className="ps-12 pt-3">
          <CardHeader
            avatar={post.user.photo}
            header={post.user.name}
            subheader={post.createdAt}
          />
          <div>
            <textarea
              value={NewPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>

          {imagPreview && (
            <div className="relative my-3">
              <img
                src={imagPreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg"
              />
              <button
                onClick={restForm}
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200">
                <input
                  onChange={handlFileInputImage}
                  type="file"
                  ref={inputfile}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Photo</span>
                </div>
              </label>
            </div>
          </div>

          <div className=" mt-3 flex justify-end gap-2">
            <Button
              onPress={() => setIsInUpdateMode(false)}
              color="default"
              variant="bordered"
            >
              Cancel
            </Button>
            <Button
              isLoading={isUpdating}
              isDisabled={!NewPostContent.trim()}
              onPress={handleUpdatePosts}
              color="primary"
              variant="bordered"
            >
              Update
            </Button>
          </div>
        </div>
      ) : (
        // هذا هو كود وضع العرض العادي
        <>
          <div className="w-full h-16 items-center flex justify-between ">
            <CardHeader
              avatar={post.user.photo}
              header={post.user.name}
              subheader={post.createdAt}
            />
            {post.user._id === userData._id && (
              <CardDropDown
                setIsInUpdateMode={setIsInUpdateMode}
                onOpen={onOpen}
              />
            )}
          </div>
          <PostBody caption={post.body} image={post.image} />
          <PostFooter numOfComment={post.comments.length} />
          <PostAction postId={post.id} />
  <CreateComment setPost={setPost}  post={post} getAllPosts={getAllPosts}postId={post.id}/>
      {post.comments.slice(0, commentsLimt ?? visibleComments) .map((comment) => (<Comment getAllPosts={getAllPosts} comment={comment}key={comment._id}
          /> ))}
      {visibleComments < post.comments.length && !commentsLimt && (
        <Button
          variant="ghost"
          isLoading={isCommentsLoading}
          onPress={loadMoreComments}
          className="block mx-auto"
        >
          Load More Comments
        </Button>
      )}


        </>
      )}

    

      <CardModle
        isLoading={isPostDelete}
        deletFunction={handelDeletPosts}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        title={"Post Delete"}
      />
    </div>
  );
}




// import React, { useContext, useState } from "react";
// import Comment from "../Comment/Comment.jsx";
// import CardHeader from "../Posts/CardHeader.jsx";
// import Postbody from "../Posts/PostBody.jsx";
// import Postfooter from "../Posts/PostFooter.jsx";
// import PostAction from "../Posts/PostAction.jsx";
// import {Button,addToast,useDisclosure} from "@heroui/react";
// // import { addComment } from "../Services/CommentServices";
// import { authContext } from "../../Context/authcontex.jsx";
// import { deletPostsApi,updatePostApi } from "../../Services/PostServices.js";
// import CreateComment from "./CreateComment.jsx";
// import CardDropDown from "../CardDropdown/CardDropdown.jsx";
// import CardModle from "../CardDropdown/CardModle.jsx";



// export default function Posts({post,commentsLimt,getAllPosts,setPost,handlFileInputImage}) {
//   if (!post || !post.user) {
// return null; // لا تعرض أي شيء إذا كان المنشور أو المستخدم الخاص به غير موجود
// }
//   const [visibleComments, setVisibleComments] = useState(2);
//   const [CommentContent, setCommentContent] = useState("");
//   const [isCommentsLoading, setIsCommentsLoading] = useState(false);
//   const [isPostDelete, setIsPostDelete] = useState(false);
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [IsInUpdateMode, setIsInUpdateMode] = useState(false);
//   const [NewPostContent, setNewPostContent] = useState(post.body);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [imagPreview, setImagePreview] = useState("");
//   const [NewImageFile, setNewImageFile] = useState(null);

//   // loade more comment

//   function loadMoreComments() {
//     setIsCommentsLoading(true);
//     setTimeout(() => {
//       setVisibleComments(visibleComments + 2);
//       setIsCommentsLoading(false);
//     }, 500);
//   }
//   // update posts
//   async function handleUpdatePosts() {
//     //function to update post//
//     setIsUpdating(true);
    
//     // إنشاء FormData لإرسال الملفات والبيانات
//     const formData = new FormData();
//     if (NewPostContent) {
//       formData.append("body", NewPostContent);
//     }
//     if (NewImageFile) {
//       formData.append("image", NewImageFile);
//     }

//     const response = await updatePostApi(post.id, formData);
//     if (response.message == "success") {
//       await getAllPosts();
//       setIsInUpdateMode(false);
//       addToast({
//          title: "success",
//         description:"post update successfuly",
//         timeout: 2000,
//         color: "success",
//       })
      
//     }
//     setIsUpdating(false);
//   }

//   //   function handelLoadMoreComment(){

//   //     setIsLoading(true);
//   //     setTimeout(() => {
//   //       setVisableComment(visableComment+5)
//   //       setIsLoading(false)

//   //     }, 200);
//   //   }
//   //   async function handelCommentSubmit(){
//   //     // console.log(CommentContent);
//   // setIscommentsubmitting(true)
//   //     const response=await addComment(CommentContent,post.id)
//   //     setIscommentsubmitting(false)
//   //     setCommentContent("")
//   //     callback()
//   //     // console.log(response);

//   //   }

//   // access
//   const { userData } = useContext(authContext);

//   async function handelDeletPosts(onClose) {
//     setIsPostDelete(true);
//     const response = await deletPostsApi(post._id);
//     if (response.message == "success") {
//       await getAllPosts()
//       // await getAllPosts();
//       setIsPostDelete(false);
//       onClose();
//       addToast({
//         title: "post deleted successfuly",
//         timeout: 2000,
//         color: "success",
//       });
//     }
//   }


//   return (
//     <div  className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-10 ">
//       {IsInUpdateMode ? (
//         <div className="ps-12 pt-3">
//           <CardHeader
//             avatar={post.user.photo}
//             header={post.user.name}
//             subheader={post.createdAt}
//           />
//           <div>
//             <textarea
//               value={NewPostContent}
//               onChange={(e) => setNewPostContent(e.target.value)}
//               className="w-full p-2 border rounded"
//               rows="4"
//             />
//           </div>

//           {imagPreview && (
//             <div className="relative my-3">
//               <img
//                 src={imagPreview}
//                 alt="Preview"
//                 className="w-full max-h-64 object-cover rounded-lg"
//               />
//               <button
//                 onClick={restForm}
//                 type="button"
//                 className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200 cursor-pointer"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//           )}

//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200">
//                 <input
//                   onChange={handlFileInputImage}
//                   type="file"
//                   // ref={inputfile}
//                   accept="image/*"
//                   className="hidden"
//                 />
//                 <div className="flex items-center space-x-2">
//                   <svg
//                     className="w-6 h-6 text-sky-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <span className="text-sm font-medium text-sky-950">Photo</span>
//                 </div>
//               </label>
//             </div>
//           </div>

//           <div className=" mt-3 flex justify-end gap-2">
//             <Button
//               onPress={() => setIsInUpdateMode(false)}
//               color="default"
//               className="text-sky-600 border-sky-100"
//               variant="bordered"
//             >
//               Cancel
//             </Button>
//             <Button
//               isLoading={isUpdating}
//               isDisabled={!NewPostContent.trim()}
//               onPress={handleUpdatePosts}
//               color="primary"
//               variant="bordered"
//             >
//               Update
//             </Button>
//           </div>
//         </div>
//       ) : (
//         // هذا هو كود وضع العرض العادي
//         <>
//           <div className="w-full h-16 items-center flex justify-between ">
//             <CardHeader
//               avatar={post.user.photo}
//               header={post.user.name}
//               subheader={post.createdAt}
//             />
//             {post.user._id === userData._id && (
//               <CardDropDown
//                 setIsInUpdateMode={setIsInUpdateMode}
//                 onOpen={onOpen}
//               />
//             )}
//           </div>
//           <Postbody caption={post.body} image={post.image} />
//           <Postfooter numOfComment={post.comments.length} />
//           <PostAction postId={post.id} />
//   <CreateComment setPost={setPost}  post={post} getAllPosts={getAllPosts}postId={post.id}/>
//       {post.comments.slice(0, commentsLimt ?? visibleComments) .map((comment) => (<Comment getAllPosts={getAllPosts} comment={comment}key={comment._id}
//           /> ))}
//       {visibleComments < post.comments.length && !commentsLimt && (
//         <Button
//           variant="ghost"
//           isLoading={isCommentsLoading}
//           onPress={loadMoreComments}
//           className="block mx-auto text-sky-950 bg-sky-400 dark:text-sky-400 dark:bg-sky-950"
//         >
//           Load More Comments
//         </Button>
//       )}


//         </>
//       )}

    

//       <CardModle
//         isLoading={isPostDelete}
//         deletFunction={handelDeletPosts}
//         onOpenChange={onOpenChange}
//         isOpen={isOpen}
//         title={"Post Delete"}
//       />
//     </div>
//   );
// }
