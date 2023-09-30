/* const initialState = {
    // Definir la estructura de datos del usuario aquí
  };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USER_SUCCESS':
        return {
          ...state,
          // Actualizar los datos del usuario en el estado
          ...action.payload,
        };
      case 'UPDATE_USER_FAILURE':
        // Manejar el error aquí si es necesario
        return state;
      default:
        return state;
    }
  };
  
  export default userReducer; */

  const initialState = {
    user: {
      email: '',
      name: '',
      lastName: '',
      country: '',
      city: '',
      address: '',
      phoneNumber: '',
    },
    payment: {
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    },
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        // Simulamos la actualización del usuario en el estado de Redux
        return {
          ...state,
          user: { ...state.user, ...action.payload },
        };
      case 'UPDATE_PAYMENT':
        // Simulamos la actualización de la información de pago en el estado de Redux
        return {
          ...state,
          payment: { ...state.payment, ...action.payload },
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  