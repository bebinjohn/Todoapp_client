import React ,{useEffect,useState} from 'react'
import {Dialog,DialogContent} from '@material-ui/core'
import '../Room/Room.css'
import Socket from 'socket.io-client'
export default function Viewuser({open,setopen,users}) {


    const [members,setmembers]=useState([])
    useEffect(()=>{
        const io=Socket(process?.env?.REACT_APP_URL,{ transports: ['websocket', 'polling', 'flashsocket'] })
        io.on('status_user',(status)=>{
            setmembers(status)
        })
    },[])
    return (
        <div>
            <Dialog
             open={open}
            keepMounted
           
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
                 
                <DialogContent  className='users_section'>
                <div className='close_dialog' onClick={() => setopen(false)}><div>&#10006;</div></div>
                <div className="users_container">
                    {
                        members?.map((each,index)=>{
                            return(
                                each?.status==="online"?<div key={index}>
                                <div title="Online" className="online_symbol"></div> <div className="online_user">{each?.member?.Name}</div>
                            </div>:<div></div>
                                
                            )
                        })
                    }
                     {
                        members?.map((each,index)=>{
                            return(
                                each?.status==="offline"?<div key={index}>
                                <div title="Offline" className="offline_symbol"></div> <div className="offline_user">{each?.member?.Name}</div>
                            </div>:<div></div>
                                
                            )
                        })
                    }
                </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
