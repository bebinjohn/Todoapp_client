export const auth=(state={status:false,profile:{}},action)=>{

    switch(action.type){
        case 'GOOGLE_LOGIN':{
            //  console.log('ji',action.payload)
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