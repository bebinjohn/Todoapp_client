import React ,{useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {deletetodo} from '../../../../actions/todo'
import {Popover,Button} from '@material-ui/core'
import '../Hold_todo/Hold_todo.css'
export default function Hold() {
    // const dispatch=useDispatch()
    const dispatch=useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const todos=useSelector(state=>state.todo)
    const auth=useSelector(state=>state.auth)
    
    const update_each=useRef()
    const handleClick = (event,each) => {
        setAnchorEl(event.currentTarget);
        update_each.current=each
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl);
    return (
        <div>
          

           <h2>Completed</h2>
           <div className='Completed_todo_container'>

                {
               todos?<div>
                   {todos.map((each,index)=>{
                       return(
                        <div>
                            {each.completed?
                            <div key={index} className='new_todo_container'>
                            <div className='Todo_Title'>
                            <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <ellipse cx="4.5" cy="5.24001" rx="4.5" ry="4.93333" fill="url(#paint0_linear)" fill-opacity="0.2"/>
                             <ellipse cx="4.50078" cy="5.28865" rx="2.7" ry="2.81979" fill="url(#paint1_linear)" fill-opacity="0.7"/>
                             <defs>
                             <linearGradient id="paint0_linear" x1="0.332031" y1="-0.0237367" x2="9.78882" y2="8.27679" gradientUnits="userSpaceOnUse">
                             <stop stop-color="#F3477A"/>
                             <stop offset="1" stop-color="#884CB2"/>
                             </linearGradient>
                             <linearGradient id="paint1_linear" x1="2" y1="2.28" x2="7.43311" y2="7.28594" gradientUnits="userSpaceOnUse">
                             <stop stop-color="#F3477A"/>
                             <stop offset="1" stop-color="#884CB2"/>
                             </linearGradient>
                             </defs>
                             </svg>
                            <h3>{each?.Title}</h3>
                            </div>
                         
                            <div> <div className='Todo_Status_Completed'><div>{each?.Status}</div></div></div>
                     <div className={each?.Type==='Minor'?'Todo_Type_Minor':each?.Type==='Normal'?"Todo_Type_Normal":"Todo_Type_Critical"}><div></div> <p>{each?.Type}</p></div>
                         <div className='Todo_Image_container'>
                             {each.Members.map((e,index)=>{
                                 return(
                                    <div><div key={index} className='Todo_members'><img alt={e?.Image} src={e?.Image}></img></div></div>
                                 )
                             })}
                         </div>
                        
                        <div> <div onClick={(e)=>handleClick(e,each)} className='Edit_button'><div>...</div></div></div>
                        <Popover
                            // id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            }}
                        >
                            <div className='Popover_container'>
                                <Button onClick={()=>{
                                    dispatch({type:"UPD_FORM",payload:update_each.current})
                                    handleClose()
                                }
                                    } variant='contained' className='Todo_functions' color='primary'>Update</Button>
                                <Button onClick={()=>{
                                    dispatch(deletetodo(update_each.current,auth.profile.user._id))
                                    handleClose()
                                    }} variant='contained' className='Todo_functions' style={{background:'red',color:"white",marginLeft:"10px"}}>Delete</Button>
                            </div>
                        </Popover>
                        </div>:<div></div>
                            }
                              
                        </div>
                      
                       )
                   })}
               </div>:<div></div>
           }
               
           </div>
        </div>
    )
}
