import axios from "axios"
const baseUrl = "https://linked-posts.routemisr.com/"




// use usequery
export function getAllPostsApi() {


    
        return  axios.get(baseUrl +"posts", {
            headers: {
                token: localStorage.getItem("token")
            },
            params: {
                sort:"-createdAt"
            }
        })
 
}


// export async function getAllPostsApi() {


//     try {
//         const { data } = await axios.get(baseUrl + "posts", {
//             headers: {
//                 token: localStorage.getItem("token")
//             },
//             params: {
//                 sort:"-createdAt"
//             }
//         })
//         return data;

//     } catch (error) {
//         return error?.response?.data;

//     }

// }


 export async function addPostsApi(formData) {
    try{
        const {data} =await axios.post(baseUrl +"posts",formData ,{
            headers:{
                token:localStorage.getItem("token")
            }
         
        })
        return data;

    }catch(error){
        // return error.response ? error.response.data.error : error.message;
                console.log(error.response.data);



    }
}
  // get sing post from api 

export async function getSinglePostsApi(postId) {
    try{
        const {data} =await axios.get(baseUrl +"posts/"+postId ,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;

    }catch(error){
        return error.response ? error.response.data.error : error.message;


    }

    
}


//delete post

export async function deletPostsApi(postId) {
    try{
        const {data} =await axios.delete(baseUrl +"posts/"+postId ,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;

    }catch(error){
        return error.response ? error.response.data.error : error.message;


    }

    
}


export async function updatePostApi(postId,formData) {
    try{
        const {data} =await axios.put(baseUrl +"posts/"+postId,formData ,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;

    }catch(error){
        return error.response ? error.response.data.error : error.message;


    }

    
}

