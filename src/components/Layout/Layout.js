import React from 'react'
import Credentials from '../credential/credential'
import Home from '../Home/Home'
import Chat from '../Chat/Chat'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Snack from '../snackbar/Snackbar'
export default function Layout() {
    return (
        <div>
            <BrowserRouter>
            <Switch>
                <Route path='/' component={Credentials} exact/>
                <Route path='/Home' component={Home} exact/>
                <Route path='/Chat' component={Chat} exact/>
            </Switch>
            <Snack/>
            </BrowserRouter>
        </div>
    )
}
