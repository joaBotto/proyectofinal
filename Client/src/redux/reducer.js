const initialState = {
    error:"",
    user:{},
    allproperties:[],
    properties:[]

}



const rootReducer = (state = initialState, {type, payload}) => {

    switch(type) {

    case "GET_PROPERTY":
        return {
            ...state,
            allproperties:[...payload],
            properties:[...payload]
        }
    
    case "CREATE_PROPERTY":
        return {
            ...state,
            allproperties:[...state.allproperties, payload],
            properties:[...state.properties, payload]
        } 

    default:
        return {
            ...state
        }
    }
}


export default rootReducer;