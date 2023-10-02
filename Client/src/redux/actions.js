import axios from 'axios'

export const getProperty = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get("www.localhost:3001/properties")
            return dispatch( {
                type:"GET_PROPERTY",
                payload: data
            })
        } catch (error) {
            return {
                type:"ERROR",
                payload: error.message
            }
        }
    }
}