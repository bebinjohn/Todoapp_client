import React,{useState,useEffect,useRef} from 'react'
import './Dashboard.css'
import Popover from './popover';
import axios from 'axios'
import Socket from 'socket.io-client';
import moment from 'moment'
import {postmessage,debounce,Pagination} from '../../../actions/chat'
import {useSelector,useDispatch} from 'react-redux'
import { Button } from '@material-ui/core';

// Todo: can add Emoji choosing function in dashboard.
// * Props ->chat,setchat -> coming for chat.js
// * selected Rooms from Room container

export default function Dashboard({chat,setchat}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const selector=useSelector(state=>state.auth?.profile)
    const [messageformat,setformat]=useState({user:selector.user,text:"",Time:new Date().getTime()})
    const [messages,setmessages]=useState([])
    const text_area=useRef()
    const chat_scroll=useRef()
    const msg_length=useRef()
    const dispatch = useDispatch()

    // * Function to set the message when user enters
    const message_type=(value)=>{
        setformat({
            ...messageformat,
            text:value
        })
    }
    //! Function Triggered only in mobile
    // * Used to open the Room when user clicks
    const openRoom=()=>{
        document.getElementById('dashboard_container').style.opacity=0;
        document.getElementById('dashboard_container').style.zIndex=0;
        document.getElementById('Room_section').style.zIndex=1;
        document.getElementById('Room_section').style.opacity=1;
    }

    // * Triggered when user clicks the send button
    const onSend=()=>{
            text_area.current.value="";
            text_area.current.focus()
            dispatch(postmessage({Room_id:chat?.data._id,message:messageformat}))
    }

    // *Useeffect hook for realtime experience .
    useEffect(()=>{
        const io=Socket(process?.env?.REACT_APP_URL,{ transports: ['websocket', 'polling', 'flashsocket'] })
        io.on('All_messages',(all)=>{
                setmessages(all?.Messages);
        })
    },[])

    //Triggered when user selects particular Room
    useEffect(()=>{
            axios.get(`${process?.env?.REACT_APP_URL}/chat/msg/${chat?.data._id}`).then((response)=>{
                setmessages(response.data.Data?.Messages);
                msg_length.current=response.data?.Data?.Messages.length;
            })
            text_area.current.focus()
            
    },[chat])

    // * for scrooling functions

    useEffect(()=>{
        // console.log(msg_length,messages.length)
        const scrolloffset=chat_scroll.current.scrollTop+chat_scroll.current.offsetHeight;
       if(msg_length.current===messages?.length)chat_scroll.current.scrollTop=chat_scroll.current.scrollHeight;
       else if(chat_scroll.current.scrollHeight-200 <=scrolloffset){
        chat_scroll.current.scrollTop=chat_scroll.current.scrollHeight;
       }
    },[messages])
     
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div id='dashboard_container' className='Dash_container'>
            <div className='Dash_Header'>
            <img onClick={()=>openRoom()} alt='Go_back' className='Go_back'src="https://img.icons8.com/pastel-glyph/64/000000/circled-left.png"/>
            <div className='Dash_name'>
                <div>
                    <img alt='Room_Profile' src={chat?.data.Image}></img>
                </div>
                <h3>{chat?.data.Name}</h3>
            </div>
            <div aria-describedby={id} onClick={(event)=>setAnchorEl(event.currentTarget)} className='Dash_options'>
                <div>...</div>
            </div>
            </div>

            {/* chat section  */}
            <div  ref={chat_scroll} className='Chating_section'>
                <div style={{display:"flex",justifyContent:"center",margin:"10px 0 20px 0"}}><Button  onClick={debounce(()=>{
                    const $lastsscroll=chat_scroll.current.scrollHeight-300;
                    Pagination(chat?.data._id).then(res=>{
                       
                        setmessages(res?.Messages)
                        chat_scroll.current.scrollTop=$lastsscroll
                    })
                },2000)} variant='contained'  color='primary' style={messages?.length<=19?{display:"none"}:null}>Load more</Button></div>
               
            {
                messages?.length!==0?
                messages?.map((each)=>{
                    return(
                        <div  className='Chat_section_container' style={each?.user?._id!==selector?.user?._id?null:{justifyContent:"flex-end",width:"98%"}}>
                        <img alt={each?.user?.Name} src={each?.user?.Image}></img>
                        <div className={each?.user?._id!==selector?.user?._id?"Other_user_message":"User_message"}>
                            <div>
                            <h2>{each?.user?.Name}</h2>
                            <i>{moment(each?.Time).format('hh:mm:a')}</i>
                            </div>
                            <p>{each?.text}</p> 
                        </div>
                    </div>
                    )
                }):<div></div>
            }
                                
            </div>
            
            {/* Message input */}
            <div className='message_input_container'>
                <div>
                    <textarea ref={text_area} onChange={(event)=>message_type(event.target.value)} placeholder='Type your message here'></textarea>
                    <div className='Send_section'>
                        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10.75" stroke="#707C97" stroke-opacity="0.5" stroke-width="2.5"/>
                        <path d="M7.63635 13.6364C8.45647 15.257 10.1028 16.3636 12 16.3636C13.8972 16.3636 15.5435 15.257 16.3636 13.6364" stroke="#707C97" stroke-opacity="0.5" stroke-width="2.5" stroke-linecap="round"/>
                        <circle cx="8.72726" cy="8.72726" r="1.09091" fill="#707C97" fill-opacity="0.5"/>
                        <circle cx="15.2727" cy="8.72726" r="1.09091" fill="#707C97" fill-opacity="0.5"/>
                        </svg> */}
                    <div onClick={debounce(onSend,1000)} className='send_icon'>
                    <img alt='send_button' src="https://img.icons8.com/material-rounded/24/ffffff/filled-sent.png"/>
                    </div>
                    </div>
                </div>
            </div>
            <Popover user_id={selector?.user?._id} setchat={setchat} value={chat?.index} anchorEl={anchorEl} open={open} id={id} setAnchorEl={setAnchorEl}/>
        </div>
    )
}
