export const snackbar=(state={opensnack:false,status:"",messsage:""},action)=>{

    switch(action.type){
        case 'OPEN_SNACK':{
            return {
                opensnack:true,
                message:action.payload.message,
                status:action.payload.status
            }
        }
        case 'CLOSE_SNACK':{
            return{
                opensnack:false
            }
        }
        default:{
            return state
        }
    }
}