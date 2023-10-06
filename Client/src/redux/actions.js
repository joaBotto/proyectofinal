import axios from "axios";
import {
	GET_PROPERTY,
	GET_PROPERTY_DETAIL,
	CLEAN_DETAIL,
  ADD_USER,
	CREATE_PROPERTY,
	ERROR,
  USER_LOGIN,
  FILTERS
} from "./actions_types";

export const getProperty = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/properties')
            
            return dispatch( {
                type:GET_PROPERTY,
                payload: data
            })
        } catch (error) {
            return {
                type:ERROR,
                payload: error.message
            }
        }
    }
  };


export const getPropertyDetail = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/properties/${id}`);
    return dispatch({ type: GET_PROPERTY_DETAIL, payload: data });
  } catch (error) {
    return { type: ERROR, payload: error.message };
  }
};

  export const cleanDetail = () => {
    return (dispatch) => {
        return dispatch({
          type: CLEAN_DETAIL,
          payload: [],
        });
    };
  }

export const createProperty = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/properties",
        values
      );
      return dispatch({
        type: CREATE_PROPERTY,
        payload: data,
      });
    } catch (error) {
      return {
        type: ERROR,
        payload: error.message,
      };
    }
  };
};

export const userLogin = (valores) => {
  const url = "http://localhost:3001/auth/login";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(url, valores);
      dispatch({
        type: USER_LOGIN,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const filters = (type, orderPrice) => {
  return {
    type: FILTERS,
    payload: { type, orderPrice },
  };
};



// export const searchProducto = (query) => {
//   return async (dispatch) => {
//     try {
//       let response;
//       if (!query) {
//         // Si no se proporciona una ciudad, obtén todos los inmuebles
//         response = await axios.get(`${URL}//`);
//       } else {
//         // Si se proporciona una ciudad, realiza la búsqueda por ciudades
//         response = await axios.get(`${URL}/${query}`);
//       }
//       const inmuebles = response.data; 
//       dispatch({
//         type: SEARCH_PRODUCTO,
//         payload: inmuebles, 
//       });
//     } catch (error) {
//       dispatch({
//         type: ERROR,
//         payload: "City not found",
//       });
//     }
//   };
// };



export const addUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:3001/users", user);
    console.log("soy data de user", data)
    const { email, password} = data
    const userCreated = {
      email,
      password
    }
    dispatch({ type: ADD_USER, payload: userCreated });
  } catch (error) {
    return { type: ERROR, payload: error.message };
  }
};




// export const filterByUbicacion = (ubicacion) => {

//   return {
//     type: FILTER_BY_UBICACION,
//     payload: ubicacion,
//   };
// };

  
  
// export const filterByPrecio = (minPrice, maxPrice, order) => {
//   return {
//     type: FILTER_BY_PRECIO,
//     payload: { minPrice, maxPrice, order },
//   };
// };

  
  
  // export const filterByPileta = (pileta) => {
  //   return{
  //   type: FILTER_BY_PILETA,
  //   payload: pileta,
  //   }
  // };
  
  // export const filterByFondo = (fondo) => {
  //   return{
  //   type: FILTER_BY_FONDO,
  //   payload: fondo,
  // }};
  
//   export const orderByResena = (puntuacion) => {
//     return{
//     type: ORDER_BY_RESENA,
//     payload: puntuacion,
//   }
// };
  
//   export const filterByCategoria = (type) => {
    
//     return{
//     type: FILTER_BY_CATEGORIA,
//     payload: { type },
//   }
// };