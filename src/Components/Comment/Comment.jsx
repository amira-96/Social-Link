import React, { useContext, useState } from "react";
import {Button,Input,  useDisclosure,addToast,} from "@heroui/react";
import CardHeader from "../Posts/CardHeader";
import { authContext } from "../../Context/authcontex";
import { deleteCommentApi } from "../../Services/CommentServices";
import CardDropDown from "../CardDropdown/CardDropdown";
import CardModle from "../CardDropdown/CardModle";
import{updateCommentApi} from '../../Services/CommentServices'

export default function Comment({ comment, getAllPosts }) {
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isCommentDeleteing, setIsCommentDeleteing] = useState(false);
  const [IsInUpdateMode,setIsInUpdateMode]=useState(false)
  const [NewCommentContent,setNewCommentContent]=useState(comment.content)
  const[isUpdating,setIsUpdating]=useState(false)

//   function delete comment//
  async function handelDeleteComment(onClose) {
    setIsCommentDeleteing(true);
    const response = await deleteCommentApi(comment._id);
    if (response.message == "success") {
      getAllPosts();
      onClose();
      addToast({
        title: "success",
        description:"comment delete successfuly",
        timeout: 2000,
        color: "success",
      });
    }
    console.log(response);
    setIsCommentDeleteing(false);
  }
  
//function to update comment//
async function handelUpdateComment() {
  setIsUpdating(true)
  const response=await updateCommentApi(comment._id,NewCommentContent)
  if(response.message=="success"){
   await getAllPosts()
    setIsInUpdateMode(false)
    addToast({
       title: "success",
        description:"comment update successfuly",
        timeout: 2000,
        color: "success",

    })

  }
  setIsUpdating(false)
}



  return (
    <div className="bg-gray-100 p-3 my-5">
      <div className="w-full h-16  flex justify-between p-3">
        <CardHeader
          avatar={comment.commentCreator.photo}
          header={comment.commentCreator.name}
          subheader={comment.createdAt}
        />
        {comment.commentCreator._id == userData?._id && (
          <CardDropDown setIsInUpdateMode={setIsInUpdateMode} onOpen={onOpen} />
        )}
      </div>

      {IsInUpdateMode ? (
        <div className="ps-12 pt-3">
          <Input isDisabled={isUpdating} value={NewCommentContent} onChange={(e)=>setNewCommentContent(e.target.value)} variant="bordered" />
          <div className=" mt-3 flex justify-end gap-2">
            <Button onPress={()=>setIsInUpdateMode(false)} color="default" className="text-sky-300 bg-sky-950 dark:text-sky-950 dark:bg-sky-400 border-sky-300" variant="bordered">
              Cancel
            </Button>
            <Button isLoading={isUpdating} isDisabled={NewCommentContent.trim().length<2} onPress={handelUpdateComment} color="default" className="text-sky-400 bg-sky-950 dark:text-sky-950 dark:bg-sky-400 border-sky-300" variant="bordered">
              Update
            </Button>
          </div>
        </div>
      ) : (
        <p className="ps-12 pt-2">{comment.content}</p>
      )}

      <CardModle
        isLoading={isCommentDeleteing}
        deletFunction={handelDeleteComment}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        title={"Comment Delete"}
      />
    </div>
  );
}
