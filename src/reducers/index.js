import {auth} from './auth'
import {todo} from './todo'
import {update} from './update'
import {Chat} from './chat'
import {Room} from './room'
import {snackbar} from './snackbar'
import {combineReducers} from 'redux'
export default  combineReducers({
    auth,
    todo,update,Chat,
    Room,snackbar
})