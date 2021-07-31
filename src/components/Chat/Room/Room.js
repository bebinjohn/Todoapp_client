import React,{useEffect} from 'react'
import './Room.css'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios';
import NewRoom from './Newroom'
import Socket from 'socket.io-client'
// import {Popover,Typography} from '@material-ui/core'
export default function Room({setchat}) {

   const dispatch=useDispatch()
   const Rooms=useSelector((state)=>state.Room)
   const auth=useSelector(state=>state.auth?.profile?.user)
    useEffect(()=>{
      const io=Socket(process?.env?.REACT_APP_URL,{ transports: ['websocket', 'polling', 'flashsocket'] })
      io.emit('NewUser',auth?._id)
      io.on('Rooms',(updated_data)=>{
       dispatch({type:"All_ROOMS",payload:updated_data})
      })
        axios.get(`${process?.env?.REACT_APP_URL}/chat/get`).then((res)=>{
          dispatch({type:"All_ROOMS",payload:res.data.Data})
          setchat({index:0,data:res.data.Data[0]})
        }).catch((err)=>console.log(err))
    },[])

    // @params (Members
    // check where user in room
    const Roomallowed=(Members)=>{
      for(let i of Members){
        if(i?._id===auth?._id)return true;
      }
      return false;
    }

    const openDashboard=()=>{
      document.getElementById('dashboard_container').style.opacity=1;
      document.getElementById('dashboard_container').style.zIndex=1;
      document.getElementById('Room_section').style.opacity=0;
      document.getElementById('Room_section').style.zIndex=0;
    }
    const openNavbar=()=>{
      const $navbar=document.getElementById('Navbar_container')
      if($navbar.classList.contains('Navbar_container')){
          $navbar.classList.remove('Navbar_container')
      }
      $navbar.classList.add('Navbar_container1')
      
    }
    const openChat=(index,each)=>{
      setchat({
        index:index,
        data:each
      })
      if(window.innerWidth<800){
      openDashboard()
      }
    }
    return (
       <div  id='Room_section' className='Room_section'>
           <div className='Room_header'>
             <div onClick={()=>openNavbar()} className='burger'>
               <div className='burger_line'></div>
               <div className='burger_line'></div>
               <div className='burger_line'></div>
             </div>
               <h2>Rooms</h2>
               <div className='New_button_container' onClick={()=>{
                 dispatch({type:"OPEN_ROOM_MODAL"})
                 dispatch({type:"ROOM_CLEAR"})
                 }}>
                   <div><span>+</span> Create New Room</div>
               </div>
           </div>

           {/* Room Names */}
        <div className='All_rooms'>
          {Rooms?.map((each,index)=>{
            
            
            if(Roomallowed(each?.Members)){
              return (
                <div  onClick={()=>openChat(index,each)} key={index} className='Room_container'>
                <div className='user_Details'>
                <img alt={each?.Name} src={each.Image}></img>
                <p>{each.Name}</p>
                <div className="members_list">
                  {each.Members.length<=4?
                    each.Members.map((member)=>{
                      return (
                        <img key={member?.Name} alt={member?.Name} src={member.Image}></img>
                      )
                      }):each.Members.slice(0,4).map((member)=>{
                        return (
                          <img  key={member?.Name} alt={member?.Name} src={member.Image}></img>
                        )
                        })
                      
                  }
                   <div className='more_container' style={each?.Members.length<=4?{display:"none"}:null} ><div>+{each?.Members.length-4}</div></div>
                 
                </div>
                </div>
                <p>{each.Description}</p>
                
        </div>
              )
            }else return<div></div>
            
          })}
            
        </div>

       
      <NewRoom/>
       </div>
    )
}
