import axios from 'axios'
import {checkingfun} from './todo'
const url=process?.env?.REACT_APP_URL



export const Login=(details)=>async(dispatch)=>{
    const {Email,Password}=details
    if(checkingfun(dispatch,{Email,Password})){
        try {
            dispatch({type:"OPEN_SNACK",payload:{status:"info",message:"Loading..."}})
            const {Email,Password}=details
            const {data}=await axios.post(`${url}/login`,{Email,Password})
            dispatch({type:"CLOSE_SNACK"})
            dispatch({type:'LOGIN',payload:data})
        } catch (error) {
            dispatch({type:"OPEN_SNACK",payload:{status:"error",message:"Login unsuccessful"}})
        }
    }
}

export const Signup=(details)=>async(dispatch)=>{
    if(checkingfun(dispatch,details)){
        try {
            dispatch({type:"OPEN_SNACK",payload:{status:"info",message:"Loading..."}})
            const {Firstname,Lastname,Email,Password,Image}=details
            const {data}=await axios.post(`${url}/signup`,{Name:`${Firstname} ${Lastname}`,Email,Password,Image});
            dispatch({type:"SIGNUP",payload:data})
        } catch (error) {
            dispatch({type:"OPEN_SNACK",payload:{status:"error",message:"Signup unsuccessful"}})
        }
    }
}

export const goolelogin=(details)=>async(dispatch)=>{
    try {
        const {data}=await axios.post(`${url}/google`,details)
        dispatch({type:"GOOGLE_LOGIN",payload:data})
    } catch (error) {
        dispatch({type:"OPEN_SNACK",payload:{status:"error",message:"Login unsuccessful"}})
    }
}