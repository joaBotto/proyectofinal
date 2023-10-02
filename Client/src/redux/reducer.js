const initialState = {
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
    }
}


export default rootReducer;