import React from 'react'
import Newtodo from './New_todo/New_todo'
import Hold_todo from './Hold_todo/Hold'
import Completed_todo from './completed_todo/completed_todo'
export default function Todo() {
    return (
        <div>
            <Newtodo />
            <Hold_todo/>
            <Completed_todo/>
        </div>
    )
}
