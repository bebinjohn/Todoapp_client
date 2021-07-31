import React from 'react'
import './Home.css'
import Header from './Header/Header'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Todo from './Todo/Todo'
export default function Home() {
    const selector=useSelector(state=>state.auth)
    const history=useHistory()
    if(!selector.status)history.push('/')
    return (
        <div className='Home_container'>
            <div className='Todo_container'>
                <Header/>
                <Todo/>
            </div>
        </div>
    )
}
 