import axios from 'axios'
const url=process?.env?.REACT_APP_URL

export const getdata=()=>async(dispatch)=>{
    dispatch({type:"OPEN_SNACK",payload:{status:"info",message:"Loading..."}})
    try {
        const {data} =await axios.get(url)
        dispatch({type:"CLOSE_SNACK"})
        dispatch({type:'GET_DATA',payload:data})
    } catch (error) {
        dispatch({type:"OPEN_SNACK",payload:{status:"error",message:"cannot get data"}})
    }
}

//Checking function for all data are filled;
// TODO : Can add Password checking and other authentication validation
export const checkingfun=(dispatch,data)=>{
   for(let i in data ){
       if(data[i]===""||data[i].length===0){
        dispatch({type:"OPEN_SNACK",payload:{status:"error",message:`${i} must be there`}})
        return false;
       }
   }
   return true;
}

export const Posttodo=(todo,id)=>async(dispatch)=>{
    if(checkingfun(dispatch,todo)){
    dispatch({type:"OPEN_SNACK",payload:{status:"info",message:"Creating..."}})
    try {
        await axios.post(`${url}/post`,{...todo,User_id:id})
        dispatch({type:"POST_DATA"})
        dispatch({type:"OPEN_SNACK",payload:{status:"Success",message:"Todo created!!"}})
        setTimeout(() => {
            dispatch({type:"CLOSE_SNACK"})
        },2000);
    } catch (error) {
        dispatch({type:"OPEN_SNACK",payload:{status:"error",message:"Unsuccessful"}})
    }
}
}

export const Updatetodo=(updated_todo,user_id)=>async(dispatch)=>{
    dispatch({type:"OPEN_SNACK",payload:{status:"info",message:"Updating..."}})
    try {
        await axios.post(`${url}/update`,updated_todo,{headers:{
            'Authorization':user_id
        }})
        dispatch({type:'UPDATE_TODO'})
        dispatch({type:"OPEN_SNACK",payload:{status:"Success",message:"Todo Updated!!"}})
        setTimeout(() => {
            dispatch({type:"CLOSE_SNACK"})
        },2000);
    } catch (error) {
        dispatch({type:"OPEN_SNACK",payload:{status:"error",message:"Unauthorized to Update!!"}})
    }
}

export const deletetodo=(todo,user_id)=>async(dispatch)=>{
    dispatch({type:"OPEN_SNACK",payload:{status:"info",message:"Deleting..."}})
    try {
        await axios.post(`${url}/delete`,todo,{headers:{
            'Authorization':user_id
        }})
        dispatch({type:'DELETE'})
        dispatch({type:"OPEN_SNACK",payload:{status:"Success",message:"Todo Deleted!"}})
        setTimeout(() => {
            dispatch({type:"CLOSE_SNACK"})
        },2000);
    } catch (error) {
        dispatch({type:"OPEN_SNACK",payload:{status:"error",message:"Unauthorized to Delete!!"}})
    }
}