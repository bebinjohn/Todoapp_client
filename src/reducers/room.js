export const Room=(state=[],action)=>{
    switch (action.type){
        case 'All_ROOMS':{
            return action.payload;
        }
        default :{
            return state;
        }
    }
}