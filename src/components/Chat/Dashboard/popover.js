import React ,{useState} from 'react'
import {Popover} from '@material-ui/core'
import './Dashboard.css'
import Users from './viewuser'
import {deleteRoom,get_userstatus} from '../../../actions/chat'
import {useDispatch,useSelector}from 'react-redux'
export default function Pop({id,open,anchorEl,setAnchorEl,value,setchat,user_id}) {

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openmodal,setopen]=useState(false)
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.Room)
    const calldispatch=()=>{
      dispatch({type:"ROOM_UPDATED",payload:selector[value]})
      handleClose()
    }
    const deleterooms=()=>{
      dispatch(deleteRoom(selector[value],user_id))
      handleClose()
      setchat({index:0,data:selector[0]})
    }
  
    return (
        <div>
             <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className='Chat_popover_section'>
            <div onClick={()=>{
              setopen(true)
              handleClose()
              get_userstatus(selector[value]?.Members)
            }}>View members</div>
            <div onClick={()=>calldispatch()}>Update</div>
            <div onClick={()=>deleterooms()} >Exit</div>
        </div>
      </Popover>
      <Users open={openmodal} setopen={setopen} users={selector[value]?.Members}/>
        </div>
    )
}
