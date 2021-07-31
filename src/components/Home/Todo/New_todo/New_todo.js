import React ,{useEffect,useState}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import './newtodo.css'
import Dialog from './Dialog'

//styles for Select


export default function Todo() {
    const dispatch=useDispatch()
    const history=useHistory()
    //Transtiton for Dialog
    const selector=useSelector(state=>state.auth)
    const todo=useSelector(state=>state.todo)
    const [count,setcount]=useState(0)

    useEffect(()=>{
        axios.post(`${process?.env?.REACT_APP_URL}/total`,{id:selector.profile.user?._id}).then((res)=>{
            setcount(
                res.data.count
            )
        })
    },[todo])

    const opendialog=()=>{
        dispatch({type:"OPEN"})
        dispatch({type:"CLEAR"})
 
    }

    const openchat=()=>{
        history.push('/Chat')
    }
    return (
        <>
        <div className='content_wrapper'>
            <h2>You've got <span>{count} tasks</span> today</h2>
            <div onClick={()=>opendialog()} className='Add_button'><div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 15H4.5C3.67125 15 3 14.3377 3 13.52V4.63997C3 3.82227 3.67125 3.15997 4.5 3.15997H13.5C14.3288 3.15997 15 3.82227 15 4.63997V13.52C15 14.3377 14.3288 15 13.5 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 6.11998V12.04" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 9.07999H6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Add New</span>
                    </div></div>

            <div onClick={()=>openchat()} className='Chat_button' title='Chat with Members'>
            <img alt='chat' src="https://img.icons8.com/nolan/64/speech-bubble-with-dots.png"/>
            <span>Chat</span>
            </div>
        </div>
        <Dialog/>
        </>
    )
}
