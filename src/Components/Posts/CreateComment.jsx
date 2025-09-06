import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { addComment} from '/src/Services/CommentServices.js'

export default function CreateComment({ postId, getAllPosts, post, setPost }) {

    const [CommentContent, setCommentContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)


    async function handleCreateComment() {
       
        setIsSubmitting(true)
        const response=await  addComment (CommentContent,post.id)
        setCommentContent("")
        getAllPosts()
        setIsSubmitting(false)
       
    }


    return (
        <div className='flex relative  '>

      <Input 
    value={CommentContent} 
    onChange={(e) => setCommentContent(e.target.value)} 
    className='pe-25 bg-gray-50 dark:border-sky-200   '
    placeholder='comment....' 
/>
        
        
        
            <Button isLoading={isSubmitting} isDisabled={CommentContent.trim().length<2} onPress={handleCreateComment} color='default' className=' bg-sky-950 text-sky-400 dark:bg-sky-400 dark:text-sky-950 absolute right-0 top-0 bottom-0 end-0'>
                Comment
            </Button>

        </div>
    )
           
}
