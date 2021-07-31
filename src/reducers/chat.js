export const Chat=(state={Data:{Name:"",Image:"",Members:[],Description:""},modal:false,update:false},action)=>{
    switch(action.type){
        case 'ROOM_CHANGE':{
            return {
                ...state,
                Data:{
                    ...state.Data,
                    [action.payload.name]:action.payload.value
                }
                
            }
        }
        case 'OPEN_ROOM_MODAL':{
            return{
                ...state,
                modal:true
            }
        }
        case 'CLOSE_ROOM_MODAL':{
            return{
                ...state,
                modal:false,
                update:false
            }
        }
        case 'ROOM_CLEAR':{
            return{
                ...state,
                Data:{
                    ...state.Data,
                    Name:"",Members:[],Description:""
                }
               
            }
        }
        case 'ROOM_UPDATED':{
            return {
                Data:action.payload,
                modal:true,
                update:true
            };
        }
        default:{
            return state
        }
    }
}

