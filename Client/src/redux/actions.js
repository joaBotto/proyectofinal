import axios from 'axios';

// Acción: Indica que se han obtenido las propiedades del usuario con éxito.
export const FETCH_USER_PROPERTIES_SUCCESS = 'FETCH_USER_PROPERTIES_SUCCESS';

// Esta función crea la acción para indicar que las propiedades del usuario se han obtenido con éxito.
export function fetchUserPropertiesSuccess(userProperties) {
  return {
    type: FETCH_USER_PROPERTIES_SUCCESS,
    userProperties, // Los datos obtenidos del servidor.
  };
}

// Esta función realiza una solicitud GET al servidor para obtener las propiedades de un usuario.
export function fetchUserProperties(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${userId}/properties`); // Reemplaza con tu URL de API
      dispatch(fetchUserPropertiesSuccess(response.data)); // Despacha la acción con los datos obtenidos.
    } catch (error) {
      // Manejar errores aquí (por ejemplo, enviarlos a la tienda Redux o mostrar mensajes de error).
    }
  };
}

// Acción: Indica que se ha actualizado una propiedad con éxito.
export const UPDATE_PROPERTY_SUCCESS = 'UPDATE_PROPERTY_SUCCESS';

// Esta función crea la acción para indicar que se ha actualizado una propiedad con éxito.
export function updatePropertySuccess(updatedProperty) {
  return {
    type: UPDATE_PROPERTY_SUCCESS,
    updatedProperty,
  };
}

// Esta función realiza una solicitud PUT al servidor para actualizar una propiedad.
export function updateProperty(propertyId, updatedData) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/properties/${propertyId}`, updatedData); // Reemplaza con tu URL de API
      dispatch(updatePropertySuccess(response.data)); // Despacha la acción con los datos actualizados.
    } catch (error) {
      // Manejar errores aquí (por ejemplo, enviarlos a la tienda Redux o mostrar mensajes de error).
    }
  };
}

// Acción: Indica que se ha eliminado una propiedad con éxito.
export const DELETE_PROPERTY_SUCCESS = 'DELETE_PROPERTY_SUCCESS';

// Esta función crea la acción para indicar que se ha eliminado una propiedad con éxito.
export function deletePropertySuccess(deletedPropertyId) {
  return {
    type: DELETE_PROPERTY_SUCCESS,
    deletedPropertyId,
  };
}

// Esta función realiza una solicitud DELETE al servidor para eliminar una propiedad.
export function deleteProperty(propertyId) {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/properties/${propertyId}`); // Reemplaza con tu URL de API
      dispatch(deletePropertySuccess(propertyId)); // Despacha la acción con el ID de la propiedad eliminada.
    } catch (error) {
      // Manejar errores aquí (por ejemplo, enviarlos a la tienda Redux o mostrar mensajes de error).
    }
  };
}

//estas no son importantes de momento 
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
