import React from 'react'
import {Snackbar} from '@material-ui/core'
import { useSelector,useDispatch } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
export default function Snackbar_dom() {

    const selector=useSelector(state=>state?.snackbar)
    const dispatch=useDispatch()
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
      
    return (
        <div>
            <Snackbar anchorOrigin={{vertical:"top",horizontal:"center"}} onClose={()=>dispatch({type:"CLOSE_SNACK"})} open={selector?.opensnack} autoHideDuration={6000} >
        <Alert onClose={()=>dispatch({type:"CLOSE_SNACK"})}   severity={selector?.status}>
          {selector?.message}
        </Alert>
      </Snackbar>
        </div>
    )
}
