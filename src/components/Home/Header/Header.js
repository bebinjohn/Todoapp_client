import React from 'react'
import {Button} from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import './Header.css'
export default function Header() {
    const history=useHistory()
    const selector=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const logout=()=>{
        history.push('/')
        dispatch({type:"LOGOUT"})
    }
    return (
        <div className='Header_wrapper'>
            <div className='space'></div>
            <h1>Tasker</h1>
            <div className='Logout_container'>
            <div className='Header_Profile'>
                <img alt='Profile_image' referrerPolicy='no-referrer' src={selector.profile.user?.Image}></img>
            </div>
            <Button style={{height:"40px"}} variant='contained' color='primary' className='Logout_Button' onClick={()=>logout()}>logout</Button>
            </div>
        </div>
    )
}
