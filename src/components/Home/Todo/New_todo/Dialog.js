import React from 'react'
import Multiple_select from './Multiple_select'
import { Dialog, DialogContent, makeStyles, Select, FormControl, InputLabel, MenuItem, Radio, RadioGroup, Button } from '@material-ui/core'
import { useSelector,useDispatch } from 'react-redux'
import './newtodo.css'
import {Posttodo,Updatetodo} from '../../../../actions/todo'
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
export default function Dialog_New() {
    const selector = useSelector(state => state.auth)
    const {Details,open,submit}=useSelector(state=>state.update)
    const dispatch=useDispatch()

    const classes = useStyles()

    const handleclose = () => {
        dispatch({type:"CLOSE"})
    }
    const sub=()=>{
        // console.log(id)
        if(submit){
            dispatch(Updatetodo(Details,selector.profile.user._id))
        }
        else{
         dispatch(Posttodo(Details,selector.profile.user._id))
        }
        //  console.log(selector)
        handleclose()
        dispatch({type:"CLEAR"});
    }
    const handleChange = (name, value) => {
        dispatch({type:'CHANGE',payload:{name,value}})
    }
    return (
        <div>
            <Dialog
                open={open}
                keepMounted
                onClose={handleclose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div onClick={() => handleclose()} className='Dialog_cancel'><div>&#10006;</div></div>
                    <div style={{ margin: 0 }} className='Dialog_content'>
                        <div className='Todo_title'>
                            <div>
                                <img alt='Title' src="https://img.icons8.com/nolan/64/todo-list.png" />
                                <h2>Title</h2>
                            </div>
                            <input value={Details.Title} onChange={(event) => handleChange(event.target.name, event.target.value)} name='Title' placeholder='Todo Name'></input>
                        </div>
                        <div className='todo_status'>
                            <div>
                                <img  alt='status' src="https://img.icons8.com/nolan/64/loading-bar.png" />
                                <h2>Status</h2>
                            </div>
                            <FormControl className={classes.formControl}>
                                <div className='Status_select'>
                                    <InputLabel id="demo-simple-select-label" className='Status_select'>Status</InputLabel>
                                    <Select style={{ width: "30%" }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='Status'
                                        value={Details.Status}
                                        onChange={(event) => handleChange(event.target.name, event.target.value)}
                                    >
                                        <MenuItem value={'Pending'}>Pending</MenuItem>
                                        <MenuItem value={'In Progress'}>In progress</MenuItem>
                                        <MenuItem value={'Completed'}>Completed</MenuItem>
                                    </Select>
                                </div>
                            </FormControl>
                        </div>
                        <div className='Type'>
                            <div>
                                <img alt='Type' src="https://img.icons8.com/nolan/64/reminders.png" />
                                <h2>Type</h2>
                            </div>
                            <RadioGroup value={Details.Type} onChange={(event) => handleChange(event.target.name, event.target.value)} className='Radio_group' name='Type'>
                                <div>
                                    <Radio
                                        value="Minor"
                                        color='primary'
                                        inputProps={{ 'aria-label': 'Minor' }}
                                    />
                                    <label>Minor</label>
                                </div>
                                <div>
                                    <Radio
                                        value="Normal"
                                        color='default'
                                        inputProps={{ 'aria-label': 'Normal' }}
                                    />
                                    <label>Normal</label>
                                </div>
                                <div>
                                    <Radio
                                        value="Critical"
                                        inputProps={{ 'aria-label': 'Critical' }}
                                    />
                                    <label>Critical</label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className='Add_members'>
                            <div>
                                <img  alt='members' src="https://img.icons8.com/dusk/64/000000/conference-call.png" />
                                <h2>Add members</h2>
                            </div>
                            <Multiple_select/>
                        </div>
                        <Button onClick={() => sub()} style={{ margin: '20px 0 0 30px' }} color='primary' variant='contained'>{submit?"Update":"Submit"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
