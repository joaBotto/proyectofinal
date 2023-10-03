import {
  // 	GET_PROPERTIES,
  GET_PROPERTY_DETAIL,
  // 	CLEAN_DETAIL,
  // 	ADD_USER,
  // 	USER_LOGIN,
  // 	ADD_PROPERTY,
  FILTERS,
  // 	ERROR,
  SEARCH_PRODUCTO,
} from "./actions_types";

const initialState = {
  error: "",
  user: {},
  allproperties: [],
  properties: [],
  propertyDetail: {},
  searchTerm: "",
};

const filterPropertyType = (state, payload) => {
  if (payload.type === "default") {
    return state.allproperties;
  } else {
    return state.allproperties.filter((property) => property.type === payload.type);
  }
};


const orderPropertyPrice = (state, payload) => {
  let propertyOrdenated = [...state.properties];
  if (payload.orderPrice === "default") {
    return propertyOrdenated;
  } else if (payload.orderPrice === "-") {
    propertyOrdenated = propertyOrdenated.slice().sort((a, b) => a.price - b.price);
  } else if (payload.orderPrice === "+") {
    propertyOrdenated = propertyOrdenated.slice().sort((a, b) => b.price - a.price);
  }
  return propertyOrdenated;
};



const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_PROPERTY":
      return {
        ...state,
        allproperties: [...payload],
        properties: [...payload],
      };

    case "CREATE_PROPERTY":
      return {
        ...state,
        allproperties: [...state.allproperties, payload],
        properties: [...state.properties, payload],
      };

    case GET_PROPERTY_DETAIL:
      return {
        ...state,
        propertyDetail: payload,
      };

    case SEARCH_PRODUCTO: // Maneja la acción SEARCH_PRODUCTO
      return {
        ...state,
        searchTerm: payload, // Actualiza searchTerm con el valor de la acción
        selectinmuebles: payload, // Actualiza selectinmuebles si es necesario
        loading: false,
        error: "",
      };

      case FILTERS:
        const filterPropertyForType = filterPropertyType(state, payload)
        const orderPropertyForPrice = orderPropertyPrice({
          ...state,
          properties:filterPropertyForType
        }, payload) 
        return {
          ...state,
          properties:orderPropertyForPrice 
        }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;

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

// const initialState = {
// 	properties: [],
// 	allProperties: [],
// 	propertyDetail: {},
// 	user: {},

// 	filters: [],
// 	errors: [],
// };

// const rootReducer = (state = initialState, { type, payload }) => {
// 	switch (type) {
// 		case GET_PROPERTIES:
// 			return {
// 				...state,
// 				properties: payload,
// 				allProperties: payload,
// 			};
// 		case GET_PROPERTY_DETAIL:
// 			return {
// 				...state,
// 				propertyDetail: payload,
// 			};
// 		case CLEAN_DETAIL:
// 			return {
// 				...state,
// 				propertyDetail: {},
// 			};
// 		case ADD_USER:
// 			return {
// 				...state,
// 				user: payload,
// 			};
// 		case ADD_PROPERTY:
// 			return {
// 				...state,
// 				properties: [...state.properties, payload],
// 				allProperties: [...state.allProperties, payload],
// 			};
// 		case CLEAN_FILTERS:
// 			return {
// 				...state,
// 				properties: state.allProperties,
// 				filters: [],
// 			};
// 		default:
// 			return state;
// 	}
// };

// export default rootReducer;

// import {
//     GET_ALL_PRODUCTO,
//     GET_PRODUCTO_DETAIL,
//     CLEAN_DETAIL,
//     SEARCH_PRODUCTO,
//     CREATE_PRODUCTO,
//     ORDER_BY_UBICACION,
//     FILTER_BY_PRECIO,
//     SET_CURRENT_PAGE,
//     FILTER_BY_PILETA,
//     FILTER_BY_FONDO,
//     ORDER_BY_RESENA,
//     FILTER_BY_CATEGORIA,
//     ERROR,
//     ADD_USER,
//     USER_LOGIN,
//     ADD_PROPERTY,
//   } from "./actions-types";

//   const initialState = {
//     inmuebles: [], //almacena todo los inmuebles
//     filteredData: [],//almacena los inmuebles filtrados
//     selectinmuebles: [],
//     propertyDetail: {},
// 	  user: {},
//     inmueblecreado:[],
//     details: [],
//     error: "",
//     loading: false,
//     currentPage: 1,
//   };

//   const rootReducer = (state = initialState, action ) => {
//     switch (action.type) {
//       case GET_ALL_PRODUCTO:
//         // Lógica para obtener todos los inmuebles
//         return {...state,
//             inmuebles:action.payload,
//             filteredData:action.payload,
//             loading: false
//     }

//       case GET_PRODUCTO_DETAIL:
//         // Lógica para obtener los detalles de un inmueble
//         return {
//             ...state,
//             details: action.payload,
//             loading: false
//           };

//       case CLEAN_DETAIL:
//         // Lógica para limpiar los detalles del inmueble
//         return {
//             ...state,
//             details: [],
//             loading: false
//           };
//           case ERROR:
//     return {
//       ...state,
//       error: action.payload,
//     };
//     case ADD_PROPERTY:
// 			return {
// 				...state,
// 				properties: [...state.properties, payload],
// 				inmuebles: [...state.inmuebles, payload],
//       };
//       case ADD_USER:
// 			return {
// 				...state,
// 				user: payload,
// 			};
//       case SEARCH_PRODUCTO:
//         // Lógica para buscar inmuebles por nombre o descripción
//         return {
//             ...state,
//             selectinmuebles: action.payload,
//             loading: false,
//             error: ""
//           };
//     //       const searchTerm = payload.toLowerCase();

//     //       const searchResults = state.producto.filter((inmubles) =>
//     //               inmuebles.

//     //       nombre.toLowerCase().includes(searchTerm) ||
//     //               inmuebles.descripcion.toLowerCase().includes(searchTerm)
//     //             );

//     //       return {
//     //               ...state,
//     //               filteredData: searchResults,
//     //             };
//       // case CREATE_PRODUCTO:
//       //   // Lógica para crear un nuevo inmueble
//       //   return {
//       //       ...state,
//       //       inmueblecreado: action.payload,
//       //       loading: false
//       //     };

//       case ORDER_BY_UBICACION:
//         // Lógica para ordenar inmuebles por ubicación
//      const sortByUbicacion = [...state.filteredData].sort((a, b) =>
//         a.ubicacion.localeCompare(b.ubicacion)
//       );
//       return {
//         ...state,
//         filteredData: sortByUbicacion,
//       };
//       case FILTER_BY_PRECIO:
//         // Lógica para filtrar inmuebles por precio
//         const { minPrice, maxPrice } = payload;
//          const filteredByPrecio = state.filteredData.filter((producto) =>
//          inmuebles.precio >= minPrice && inmuebles.precio <= maxPrice
//          );
//      return {
//     ...state,
//     filteredData: filteredByPrecio};

//       case SET_CURRENT_PAGE:
//         // Lógica para actualizar la página actual
//         return { ...state, currentPage: payload };

//       case FILTER_BY_PILETA:
//         // Lógica para filtrar inmuebles por la presencia de una pileta
//         const filteredByPileta = state.inmuebles.filter((inmuebles) => inmuebles.detalle.pileta === action.payload
//           );

//           return {
//             ...state,
//             filteredData: filteredByPileta,
//           };
//         return {...state,
//             filteredData:state.filteredData
//     };

//       case FILTER_BY_FONDO:
//         // Lógica para filtrar inmuebles por la presencia de un fondo
//         const filteredByFondo = state.producto.filter((inmuebles) => producto.detalle.fondo === action.payload);
// >>>>>>> dev

//         return {...state,
//             filteredData: filteredByFondo };

//       case ORDER_BY_RESENA:
//         // Lógica para ordenar inmuebles por reseña
//         const sortByResena = [...state.filteredData].sort((a, b) =>
//         b.puntuacion - a.puntuacion
//       );
//       return {
//         ...state,
//         filteredData: sortByResena,
//       };

//       case FILTER_BY_CATEGORIA:
//         // Lógica para filtrar inmuebles por categoría (casa o departamento)
//         const categoria = action.payload;
//         const filteredByCategoria = state.filteredData.filter(
//           (inmuebles) => inmuebles.categoria === categoria
//         );
//         return {
//           ...state,
//           filteredData: filteredByCategoria,
//         };

//       default:
//         return state;
//     }
//   };
