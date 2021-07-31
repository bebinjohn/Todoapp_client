import React,{useState} from 'react'
import Navbar from './Navbar/Navbar'
import Room from './Room/Room'
import Dashboard from '../Chat/Dashboard/Dashboard'
import './Chat.css'
export default function Chat() {
    const [chats,setchats]=useState({index:0,data:{}})
    return (
        <div className='Dashboard_container'>
           <Navbar/>
           <div className='Chat_section'>
            <Room setchat={setchats}/>
            <Dashboard chat={chats} setchat={setchats}/>
            </div>
        </div>
    )
}
