import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_PROPERTY,
  GET_PROPERTY_DETAIL,
  CLEAN_DETAIL,
  ADD_USER,
  CREATE_PROPERTY,
  ERROR,
  USER_LOGIN,
  FILTERS,
  PROPERTY_EDITED,
  CREATE_BOOKING,
  GET_ALL_BOOKINGS,
  GET_BOOKING,
  GET_ALL_USERS,
  USER_EDITED,
  USER_LOGOUT,
  RESET_STATE,
  PROPERTY_DAYS_EDITED,
  SAVE_PROPERTY,
  REMOVE_FROM_SAVED,
  USER_AUTHENTICATED,
  DELETE_PROPERTY,
  USER_BY_ID
} from "./actions_types";

// const URL = "http://localhost:3001";

export const getUserById = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/users/${id}`);
		return dispatch({ 
			type: USER_BY_ID,
			payload: data
		 });
	} catch (error) {
		return dispatch({ 
			type: ERROR, 
			payload: error.message
		 });
	}
};




export const addPropertyToSaved = (propertyId) => {
	return async (dispatch, getState) => {
	   try {
		  const state = getState();
		  if (!state.user) {
			//  alert("You must be logged in to add to favorites");
			 // Redireccionar al usuario al login
			window.location = "/login"; 
			 return;
		  }
		  
		  return dispatch({
			 type: SAVE_PROPERTY,
			 payload: propertyId,
		  });   
	   } catch (error) {
		  console.error("Error adding property to saved list:", error);
	   }
	};
 };

export const removePropertyFromSaved = (propertyId) => {
	return async (dispatch) => {
		try {
			return dispatch({
				type: REMOVE_FROM_SAVED,
				payload: propertyId,
			});
		} catch (error) {
			console.error("Error removing property from saved list:", error);
		}
	};
};

export const userAuthenticated = (user) => {
	return {
		type: USER_AUTHENTICATED,
		payload: user,
	};
};

export const errorType = (message) => {
	return {
		type: ERROR,
		payload: message,
	};
};

export const getProperty = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/properties");

			return dispatch({
				type: GET_PROPERTY,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

export const getPropertyDetail = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/properties/${id}`);
		return dispatch({ type: GET_PROPERTY_DETAIL, payload: data });
	} catch (error) {
		return dispatch({ type: ERROR, payload: error.message });
	}
};


export const cleanDetail = () => {
	return {
		type: CLEAN_DETAIL,
		payload: [],
	};
};

export const createProperty = (values, setShowSuccessModal, setShowErrorModal) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post("/properties", values);
			// toast.success("The property was created successfully");
		 dispatch({
				type: CREATE_PROPERTY,
				payload: data,
			});
			setShowSuccessModal(true);
		} catch (error) {
			dispatch({ type: ERROR, payload: error.message });
			setShowErrorModal(true);
		
			
			
			// toast.error("Error when creating the property, missing fields");
		}
	};
};

export const editProperty = (propertyEdited) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put("/properties", propertyEdited);
			return dispatch({
				type: PROPERTY_EDITED,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

export const editPropertyAvailability = (propertyId, newAvailableDays) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`/properties/${propertyId}`, {
				availableDays: newAvailableDays,
			});
			dispatch({
				type: PROPERTY_DAYS_EDITED,
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

export const userLogin = (valores) => {
  const url = "http://localhost:3001/auth/login";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(url, valores);
      const { user } = data;
    //   console.log("AUTH",user)
      return dispatch({
        type: USER_LOGIN,
        payload: user
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

//!------- User LogOut ---------------
export const userLogOut = () => {
  return {
		type: USER_LOGOUT,
	};
};

export const resetState = () => {
	return {
		type: RESET_STATE,
	};
};
//!-----------------------------------

export const filters = (type, orderPrice, search) => {
	return {
		type: FILTERS,
		payload: { type, orderPrice, search },
	};
};

export const updateUser = (userEdited) => {
	// console.log("userEdited", userEdited);
	return async (dispatch) => {
		try {
			const { data } = await axios.put("/users", userEdited);
			// console.log("soydataAccion", data);
			return dispatch({
				type: USER_EDITED,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

export const addUser = (user, setShowSuccessModal, setShowErrorModal) => async (dispatch) => {

	try {
	  const { data } = await axios.post("/users", user);
	//   console.log("SOY LA data de user", data);
	 
	  if (data) {
	  const { email } = data;
	  await axios.post("/mail/login", {email: email} )
	  
	  const userCreated = {
		email,
		password,
	  };
	  dispatch({ type: ADD_USER, payload: userCreated });
  }
  setShowSuccessModal(true);
  } catch (error) {
	  dispatch({ type: ERROR, payload: error.message });
	  setShowErrorModal(true);
  }
  
  };

export const addNewBooking = (bookingData) => async (dispatch) => {
	try {
		const { data } = await axios.post("/bookings", bookingData);
		toast.success("Booking successfull");
		// console.log("Booking successfull");
		return dispatch({
			type: CREATE_BOOKING,
			payload: data,
		});
	} catch (error) {
		toast.warning("Error in booking");

		return dispatch({ type: ERROR, payload: error.message });
	}
};

export const getAllBookings = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/bookings");

			return dispatch({
				type: GET_ALL_BOOKINGS,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

export const getBooking = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/bookings/${id}`);
		return dispatch({ type: GET_BOOKING, payload: data });
	} catch (error) {
		return dispatch({ type: ERROR, payload: error.message });
	}
};

export const getAllUsers = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/users");
			return dispatch({
				type: GET_ALL_USERS,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

export const propertyDelete = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/properties/${id}`);
      return dispatch({
        type: DELETE_PROPERTY,
        payload: data,
      });
      
    } catch (error) {
       return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  }
}

