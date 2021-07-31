export const todo=(state=[],action)=>{
        switch(action.type){
            case 'GET_DATA':{
                // console.log('I am  caliinf in redux')
                return[...action.payload]
            }
            case 'POST_DATA':{
                return state;
            }
            case 'UPDATE_TODO':{
                // alert('updated!!')
                // console.log('updated!!!')
                return state;
            }
            default:{
                return state;
            }
        }
}