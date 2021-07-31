import axios from 'axios'
import Socket from 'socket.io-client'
import {checkingfun} from './todo'
const url=process?.env?.REACT_APP_URL
const io=Socket(process?.env?.REACT_APP_URL,{ transports: ['websocket', 'polling', 'flashsocket'] })

export const createRoom=(details)=>async(dispatch)=>{
    if(checkingfun(dispatch,details)){
    dispatch({type:"OPEN_SNACK",payload:{status:"info",message:"Creating..."}})
    try {
        await axios.post(`${url}/chat`,details)
        dispatch({type:"OPEN_SNACK",payload:{status:"Success",message:"Room created!!"}})
        setTimeout(() => {
            dispatch({type:"CLOSE_SNACK"})
        },2000);
    } catch (error) {
        dispatch({type:"ERROR",payload:error.message})
    }
}
    
}
export const updateRoom=(updated_data)=>async(dispatch)=>{
        // io.emit('Update_data',updated_data)
        dispatch({type:"OPEN_SNACK",payload:{status:"info",message:"Updating..."}})
        try {
            await axios.post(`${url}/chat/update`,updated_data)
            dispatch({type:"OPEN_SNACK",payload:{status:"Success",message:"Room updated!!"}})
            setTimeout(() => {
                dispatch({type:"CLOSE_SNACK"})
            },2000);
        } catch (error) {
            dispatch({type:"ERROR",payload:error.message})
        }
}
export const deleteRoom=(Details,user_id)=>async(dispatch)=>{
    dispatch({type:"OPEN_SNACK",payload:{status:"info",message:"Exiting..."}})
    try {
        await axios.post(`${url}/chat/delete`,{Room:Details,user_id})
        dispatch({type:"OPEN_SNACK",payload:{status:"Success",message:"Exited"}})
        setTimeout(() => {
            dispatch({type:"CLOSE_SNACK"})
        },2000);
    } catch (error) {
        dispatch({type:"ERROR",payload:error.message})
    }
}

export const postmessage=(Details)=>async(dispatch)=>{
     if(Details.message.text===""||Details.message.text===" "){
         return dispatch({type:"OPEN_SNACK",payload:{status:"error",message:"Enter valid message!!"}})
     }
    try {
        await axios.post(`${url}/chat/message`,Details)
    } catch (error) {
        dispatch({type:"ERROR",payload:error.message})
    }
}

export const get_userstatus=(members)=>{
        io.emit('userstatus',members)
}

// Function for pagination
let limit=40;
export const Pagination=async(id)=>{
    const {data}=await axios.get(`${url}/chat/msg/${id}/${limit}`);
    limit+=20;
return data?.messages;
}


export const debounce=(fn,delay)=>{
    let time;
    return function(){
        if(time)clearTimeout(time);
        time=setTimeout(() => {
            fn()
        }, delay);
    }
}

