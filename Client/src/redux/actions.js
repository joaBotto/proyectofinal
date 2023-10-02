

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

export const createProperty = (values) => {
    return async (dispatch) => {
        try {
            
            const { data } = await axios.post('http://localhost:3001/properties', values)
            return dispatch( {
                type:"CREATE_PROPERTY",
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
/////////////////////////////

import {
    GET_ALL_PRODUCTO,
    GET_PRODUCTO_DETAIL,
    CLEAN_DETAIL,
    SEARCH_PRODUCTO,
    CREATE_PRODUCTO,
    ORDER_BY_UBICACION,
    FILTER_BY_PRECIO,
    SET_CURRENT_PAGE,
    FILTER_BY_PILETA,
    FILTER_BY_FONDO,
    ORDER_BY_RESENA,
    FILTER_BY_CATEGORIA,
    ERROR,
    ADD_USER,
    USER_LOGIN,
    ADD_PROPERTY,
  } from "./actions-types"; 

  const URL = "http://localhost:3001";

export const getAllInmuebles = () => {
    return async (dispatch) => {
        try {
          const response = await axios.get(`${URL}/properties`);
          dispatch({
            type: GET_ALL_PRODUCTO,
            payload: response.data,
          });
        } catch (error) {
          dispatch({
            type: ERROR,
            payload: 'Error getting all inmuebles',
          });
        }
      };
    }
   

  
  export const getProductoDetail = (Id) => {
    return async (dispatch) => {
        try {
          const response = await axios.get(`${URL}/properties/${Id}`);
          dispatch({
            type: GET_PRODUCTO_DETAIL,
            payload: response.data,
          });
        } catch (error) {
          dispatch({
            type: ERROR,
            payload: 'Error getting countries detail',
          });
        }
      };
    }
    
  
  export const cleanDetail = () => {
    return (dispatch) => {
        return dispatch({
          type: CLEAN_DETAIL,
          payload: [], 
        });
    };
  }
   
  export const addUser = (user) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/users`, user);
      dispatch({ type: ADD_USER, payload: data });
    } catch (error) {
      return { type: ERROR, payload: error.message };
    }
  };

  export const userLogin = (user) => async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/users`, user);
      dispatch({ type: USER_LOGIN, payload: data });
    } catch (error) {
      return { type: ERROR, payload: error.message };
    }
  };
  
  export const addProperty = (property) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/properties`, property);
      dispatch({ type: ADD_PROPERTY, payload: data });
    } catch (error) {
      return { type: ERROR, payload: error.message };
    }
  };
  export const searchProducto = (query) => {

    return async (dispatch) => {
        try {
          let response;
          if (!query) {
            // Si no se proporciona una ciudad, obtén todos los inmuebles
            response = await axios.get(`${URL}//`);
          } else {
            // Si se proporciona una ciudad, realiza la búsqueda por ciudades
            response = await axios.get(`${URL}/${query}`);
          }
          const inmuebles = response.data;
          dispatch({
            type: SEARCH_PRODUCTO,
            payload: countries,
          });
        } catch (error) {
          dispatch({
            type: ERROR,
            payload: 'Ciudad not found',
          });
        }
      };
    };
 
  export const createInmueble = (inmuebleData) => {
    return async (dispatch) => {
        try {
          const response = await axios.post(`${URL}//`);
          dispatch({
            type: CREATE_PRODUCTO,
            payload: response.data,
          });
        } catch (error) {
          dispatch({
            type: ERROR,
            payload: 'Error creating Inmueble',
          });
        }
      };
    }
 


  
  export const orderByUbicacion = (ubicacion) => {
    return {
         
      type: ORDER_BY_UBICACION,
        payload: ubicacion,
    };
}
  
  export const filterByPrecio = (minPrice, maxPrice) =>{
    return{
    type: FILTER_BY_PRECIO,
    payload: { minPrice, maxPrice },
  };
  }
  
  export const setCurrentPage = (page) => {
    return{
  type: SET_CURRENT_PAGE,
  payload: page,
  };
}
  
  export const filterByPileta = (pileta) => {
    return{
    type: FILTER_BY_PILETA,
    payload: pileta,
    }
  };
  
  export const filterByFondo = (fondo) => {
    return{
    type: FILTER_BY_FONDO,
    payload: fondo,
  }};
  
  export const orderByResena = (puntuacion) => {
    return{
    type: ORDER_BY_RESENA,
    payload: puntuacion,
  }
};
  
  export const filterByCategoria = (casa, departamento) => {
    return{
    type: FILTER_BY_CATEGORIA,
    payload: { casa, departamento },
  }
};
/////////////////////////

// import axios from "axios";
// import {
// 	GET_PROPERTIES,
// 	GET_PROPERTY_DETAIL,
// 	CLEAN_DETAIL,
// 	ADD_USER,
// 	USER_LOGIN,
// 	ADD_PROPERTY,
// 	CLEAN_FILTERS,
// 	ERROR,
// } from "./actions_types";

// const URL = "http://localhost:3001";

// export const getProperties = () => async (dispatch) => {
// 	try {
// 		const { data } = await axios.get(`${URL}/properties`);
// 		dispatch({ type: GET_PROPERTIES, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const getPropertyDetail = (id) => async (dispatch) => {
// 	try {
// 		const { data } = await axios.get(`${URL}/properties/${id}`);
// 		dispatch({ type: GET_PROPERTY_DETAIL, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const cleanDetail = () => (dispatch) => {
// 	dispatch({ type: CLEAN_DETAIL });
// };

// export const addUser = (user) => async (dispatch) => {
// 	try {
// 		const { data } = await axios.post(`${URL}/users`, user);
// 		dispatch({ type: ADD_USER, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const userLogin = (user) => async (dispatch) => {
// 	try {
// 		const { data } = await axios.get(`${URL}/users`, user);
// 		dispatch({ type: USER_LOGIN, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const addProperty = (property) => async (dispatch) => {
// 	try {
// 		const { data } = await axios.post(`${URL}/properties`, property);
// 		dispatch({ type: ADD_PROPERTY, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const cleanFilters = () => (dispatch) => {
// 	dispatch({ type: CLEAN_FILTERS });
// };