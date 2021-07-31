import React,{useState} from 'react'
import Input from './Input/input'
import {useDispatch,useSelector} from 'react-redux'
import GoogleLogin from 'react-google-login'
import {goolelogin} from '../../actions/auth'
import {Login,Signup} from '../../actions/auth'
import {useHistory} from 'react-router'
import ChooseFile from 'react-file-base64'
import './credential.css'
export default function Credentials(){

    const dispatch=useDispatch()
    const history=useHistory()
    const store=useSelector(state=>state.auth)

    if(store.status) history.push('/Home')
    const [state,setstate]=useState(true)
    const [details,setdetails]=useState({Firstname:"",Lastname:"",Email:"",Password:"",Image:""})

    const googlesuccess=(data)=>{
        dispatch(goolelogin(data.profileObj))
    }
    const googlefailure=()=>{
        alert('Error in sigin')
    }

    const submit=()=>{
        if(state){
            dispatch(Login(details))
        }
        else{
           dispatch(Signup(details))
        }
    }
    return(
        <section className='Credential_container'>
            <div className='typing'>
            <div ><span className='Title'>Tasker </span><span className='Title_text'>Makes Your Life Easier</span></div></div>
            {/* Login */}
            <div className='Login_form_wrapper'>
                <h2>{state?"Login":"signup"}</h2>
                    {state?
                    <div></div>:
                    <div><Input change={details}  onchange={setdetails}  name='Firstname' type='text' label='Firstname'/>
                    <Input  change={details}  onchange={setdetails}  name='Lastname' type='text' label='Lastname'/>
                    </div>
                    }
                    
                    <Input change={details}  onchange={setdetails}  name='Email' type='email' label='Email'/>
                    <Input change={details}  onchange={setdetails}  name='Password' type='password' label='Password'/>
                   {
                       state?<div></div>:
                       <div>
                           <div className='Profile_pic'>Your Profile Pic</div>
                    <div className='ChooseFile_container'> <ChooseFile  onDone={({base64})=>setdetails({
                        ...details,
                        Image:base64
                    })} type='file' multiple={false}/></div>
                       </div>
                   }

            <div onClick={()=>submit()} className='Submit_button'><div>{state?"Login":"signup"}</div></div>

            <p>or {state?"Login":"signup"} with</p>
            
            <GoogleLogin
                clientId="627841406523-iigpqq5gsoija8hb26eq4m37703j0ofq.apps.googleusercontent.com"
                render={renderProps => (
                    <div onClick={renderProps.onClick} disabled={renderProps.disabled} className='google_signin'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.3541 7.53113H15.75V7.5H9V10.5H13.2386C12.6203 12.2464 10.9586 13.5 9 13.5C6.51487 13.5 4.5 11.4851 4.5 9C4.5 6.51487 6.51487 4.5 9 4.5C10.1471 4.5 11.1908 4.93275 11.9854 5.63962L14.1068 3.51825C12.7673 2.26987 10.9755 1.5 9 1.5C4.85812 1.5 1.5 4.85812 1.5 9C1.5 13.1419 4.85812 16.5 9 16.5C13.1419 16.5 16.5 13.1419 16.5 9C16.5 8.49713 16.4482 8.00625 16.3541 7.53113Z" fill="#FFC107"/>
                <path d="M2.36475 5.50913L4.82887 7.31625C5.49562 5.6655 7.11037 4.5 9 4.5C10.1471 4.5 11.1907 4.93275 11.9854 5.63963L14.1067 3.51825C12.7672 2.26988 10.9755 1.5 9 1.5C6.11925 1.5 3.621 3.12638 2.36475 5.50913Z" fill="#FF3D00"/>
                <path d="M8.99999 16.5C10.9372 16.5 12.6975 15.7586 14.0284 14.553L11.7071 12.5888C10.9541 13.1591 10.0181 13.5 8.99999 13.5C7.04924 13.5 5.39287 12.2561 4.76887 10.5203L2.32312 12.4046C3.56437 14.8335 6.08512 16.5 8.99999 16.5Z" fill="#4CAF50"/>
                <path d="M16.3541 7.53113H15.75V7.5H9V10.5H13.2386C12.9416 11.3389 12.402 12.0622 11.706 12.5891C11.7064 12.5887 11.7067 12.5887 11.7071 12.5884L14.0284 14.5526C13.8641 14.7019 16.5 12.75 16.5 9C16.5 8.49713 16.4482 8.00625 16.3541 7.53113Z" fill="#1976D2"/>
                </svg>
                </div>
                )}
                onSuccess={googlesuccess}
                onFailure={googlefailure}
                cookiePolicy={'single_host_origin'}
            />
            <div className='check_section'> {state?"Newbie?":"Existing User?"}  <span onClick={()=>setstate(prev=>!prev)}>{state?'Create Account':'Log In'}</span></div>
            </div>
        </section>
    )
}