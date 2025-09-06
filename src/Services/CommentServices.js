
import axios from "axios"
const baseUrl = "https://linked-posts.routemisr.com/";

 export async function addComment(commentContent,postId) {
    try {
                const token = localStorage.getItem("token");
               console.log("Token being sent:", token);


        const {data}=await axios.post(baseUrl+"comments",{
            content:commentContent,
            post:postId
        },{
            headers:{
                token:localStorage.getItem("token")

            }
        })


        return data;
    } catch (error) {
                return error.response ? error.response.data.error : error.message;

        
    }
    
}





export async function deleteCommentApi(commentId) {
    try{
        const {data} =await axios.delete(baseUrl +"comments/"+commentId ,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;

    }catch(error){
        return error.response ? error.response.data.error : error.message;


    }

    
}

export async function updateCommentApi(commentId,NewCommentContent) {
    try{
        const {data} =await axios.put(baseUrl +"comments/"+commentId ,{
            content:NewCommentContent
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;

    }catch(error){
        return error.response ? error.response.data.error : error.message;


    }

    
}
