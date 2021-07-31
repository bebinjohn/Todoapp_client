export const update=(state={open:false,Details:{Title: "", Status: "", Type: "", Members: [] },submit:true},action)=>{
    switch (action.type){
        case 'CHANGE':{
            return{
                ...state,
                Details:{
                    ...state.Details,
                    [action.payload.name]:action.payload.value
                }
            }
        }
        case 'MEMBERS':{
                return{
                    ...state,
                    Details:{
                        ...state.Details,
                        Members:action.payload
                    }
                } 
        }

        case "CLEAR":{
            return{
                ...state,
                Details:{
                    Title: "", Status: "", Type: "", Members: []
                }
            } 
        }
        case 'OPEN':{
            return{
                ...state,
                open:true,
                submit:false
            }
        }
        case 'CLOSE':{
            return{
                ...state,
                open:false,
                submit:false
            }
        }
        case "UPD_FORM":{
            // console.log('I am calling!!')
            return{
                ...state,
                Details:{...action.payload},
                submit:true,
                open:true
            }
        }
        case "DELETE":{
            return state
        }
        default:{
            return state
        }
    }
}