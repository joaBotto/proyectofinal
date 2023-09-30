// userActions.js
/* import axios from 'axios';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const updateUser = (userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    // Realiza una solicitud al servidor para actualizar los datos del usuario
    const response = await axios.put('/api/users', userData);

    // Si la solicitud tiene éxito, actualiza el estado con los nuevos datos del usuario
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data, // Suponiendo que el servidor devuelve los datos actualizados del usuario
    });
  } catch (error) {
    // Manejar errores en caso de que la solicitud falle
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.message, // Puedes personalizar el manejo de errores según tus necesidades
    });
  }
};
 */

// userActions.js
export const updateUser = (formData) => {
  return {
    type: 'UPDATE_USER',
    payload: formData,
  };
};

// paymentActions.js
export const updatePayment = (paymentData) => {
  return {
    type: 'UPDATE_PAYMENT',
    payload: paymentData,
  };
};
