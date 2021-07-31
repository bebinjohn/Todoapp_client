import React from 'react'
import {Dialog,DialogContent,Button} from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux'
import Choosefile from 'react-file-base64'
import MultipleSelect from './multipleselect'
import {createRoom,updateRoom} from '../../../actions/chat'
import './Room.css'
export default function Newroom() {
    const dispatch=useDispatch()
    const handleclose=()=>{
        dispatch({type:"CLOSE_ROOM_MODAL"});
    }
    const selector=useSelector(state=>state.Chat?.Data)
    const updated=useSelector(state=>state.Chat?.update)
    const modal=useSelector(state=>state.Chat?.modal)
    const handlechange=(event)=>{

            dispatch({type:"ROOM_CHANGE",payload:{name:event.target.name,value:event.target.value}})
    }
    
    const handleSubmit=()=>{
        if(updated){
            dispatch(updateRoom(selector))
        }
        else{
            dispatch(createRoom(selector))
        }
       
        handleclose()
        dispatch({type:"ROOM_CLEAR"});
    }
    return (
        <div>
            <Dialog 
            open={modal}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogContent className='Newroom_Dialog'>
            <div className='close_dialog' onClick={() => handleclose()}><div>&#10006;</div></div>
            <section>
                <div className='Room_Name'>
                    <div>
                    <img alt='Name' src="https://img.icons8.com/dusk/64/000000/filled-chat.png"/>
                    <label>Name</label>
                    </div>
                    <input value={selector.Name} onChange={(event)=>handlechange(event)} name='Name'></input>
                </div>
               
                <div className='Room_Name'>
                    <div>
                    <img alt='Room_profile' src="https://img.icons8.com/office/16/000000/camera--v1.png"/>
                    <label>Room Pic</label>
                    </div>
                    <Choosefile  onDone={({base64})=>handlechange({target:{name:"Image",value:base64}})} name='Image'/>
                </div>
                <div className='Room_Name'>
                    <div>
                    <img alt='Room_Description' src="https://img.icons8.com/ios-glyphs/50/000000/create-new.png"/>
                    <label>Description</label>
                    </div>
                    <textarea value={selector.Description} onChange={(event)=>handlechange(event)} name="Description"></textarea>
                </div>
                 <div className='Room_Name'>
                <div>
                <img alt='Members' src="https://img.icons8.com/dusk/30/000000/conference-call.png"/>
                <label>Members</label>
                </div>
                <MultipleSelect/>
            </div>
            <div className="Button_container">   
            <Button onClick={()=>handleSubmit()} variant='contained' color='primary' style={{width:"80%"}}>{updated?"Update":"Submit"}</Button>
            </div>
            

    </section>

            </DialogContent>
            </Dialog>
        </div>
    )
}
