
// * Reducers for Login and Logout Functions
// Todo: store in local storage the status so that when user opens the app can enter in to app without login

export const auth=(state={status:false,profile:{}},action)=>{

    switch(action.type){
        case 'GOOGLE_LOGIN':{
            return {status:true,profile:action.payload}
        }
        case 'LOGIN':{
            return{status:true,profile:action.payload}
        }
        case 'SIGNUP':{
            return{status:true,profile:action.payload}
        }
        case 'LOGOUT':{
            return{...state,status:false}
        }
        case 'ERROR':{
            alert(action.payload)
            return {...state,status:false}
        }
        case 'UPD_ERR':{
            alert(action.payload)
            return state;
        }
        default :{
            return state;
        }
    }

}