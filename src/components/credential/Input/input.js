import React,{useState} from 'react'
import './input.css'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
export default function Input({label,type,name,onchange,change}) {

   const [show,setshow]=useState(false)
   const showpassword=()=>{
       setshow(prev=>!prev);
   }
   const changeInput=(e)=>{
            onchange({
                ...change,
                [e.target.name]:e.target.value
            })
   }
   if(type==='password'){
       return(
    <div className='Input_wrapper'>
    <input onChange={(event)=>changeInput(event)} name={name} required type={show?'text':'password'}></input>
    <span className='show_icon' style={{cursor:'pointer'}} onClick={()=>showpassword()}> {show?<Visibility/>:<VisibilityOff/>}</span>
    <div className='Line'></div>
    <label className='Input_label'>{label}</label>
</div>
       )
   }
    return (
        <div className='Input_wrapper'>
            <input onChange={(event)=>changeInput(event)} name={name} required type={type}></input>
            <div className='Line'></div>
            <label className='Input_label'>{label}</label>
        </div>
    )
   
}
