import {
    GET_PROPERTY,
    GET_PROPERTY_DETAIL,
    CREATE_PROPERTY,
    ADD_USER,
    CLEAN_DETAIL,
    ERROR,
    SEARCH_PRODUCTO,
    FILTER_BY_UBICACION,
    FILTER_BY_PRECIO,
    FILTER_BY_PILETA,
    FILTER_BY_FONDO,
    ORDER_BY_RESENA,
    FILTER_BY_CATEGORIA,
} from "./actions_types";

const initialState = {
  error: "",
  user: {},
  properties:[],
  allproperties: [],
  filteredData: [],//almacena los inmuebles filtrados
  propertyDetail: {},
  searchTerm: "",
  details: [],
};

const filterPropertyType = (state, payload) => {
  if (payload.type === "default") {
    return state.allproperties;
  } else {
    return state.allproperties.filter(
      (property) => property.type === payload.type
    );
  }
};

const orderPropertyPrice = (state, payload) => {
  let propertyOrdenated = [...state.properties];
  if (payload.orderPrice === "default") {
    return propertyOrdenated;
  } else if (payload.orderPrice === "-") {
    propertyOrdenated = propertyOrdenated
      .slice()
      .sort((a, b) => a.price - b.price);
  } else if (payload.orderPrice === "+") {
    propertyOrdenated = propertyOrdenated
      .slice()
      .sort((a, b) => b.price - a.price);
  }
  return propertyOrdenated;
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case GET_PROPERTY:
      return {
        ...state,
        allproperties: [...payload],
        properties: [...payload],
        filteredData:[...payload],
      };

    case CREATE_PROPERTY:
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

      
      case ADD_USER:
			return {
				...state,
				user: payload,
			};

      case CLEAN_DETAIL:
                // Lógica para limpiar los detalles del inmueble
                return {
                    ...state,
                    details: [],
                    loading: false
                  };
                  case ERROR:
            return {
              ...state,
              error: payload,
            };

       case ERROR:
      return {
      ...state,
       error:payload,
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
      const filterPropertyForType = filterPropertyType(state, payload);
      const orderPropertyForPrice = orderPropertyPrice(
        {
          ...state,
          properties: filterPropertyForType,
        },
        payload
      );
      return {
        ...state,
        properties: orderPropertyForPrice,
      };

    case ADD_USER:
      return {
        ...state,
        user: payload,
      };
     
      case FILTER_BY_UBICACION:
     const ubicacion = payload;
      const filteredByUbicacion = state.allproperties.filter(
    (property) => property.address.city === ubicacion
      );
  return {
    ...state,
    filteredData: filteredByUbicacion,
  };



     
case FILTER_BY_PRECIO:
  const { minPrice, maxPrice, order } = payload;
  let filteredByPrecio = [...state.filteredData];

  // Lógica para filtrar inmuebles por precio
  if (order === 'asc') {
    filteredByPrecio = filteredByPrecio.sort((a, b) => a.precio - b.precio);
  } else if (order === 'desc') {
    filteredByPrecio = filteredByPrecio.sort((a, b) => b.precio - a.precio);
  }

  filteredByPrecio = filteredByPrecio.filter(
    (property) => property.precio >= minPrice && property.precio <= maxPrice
  );

  return {
    ...state,
    filteredData: filteredByPrecio,
  };




     
     case FILTER_BY_PILETA:
        // Lógica para filtrar inmuebles por la presencia de una pileta
        const filteredByPileta = state.inmuebles.filter((properties) => properties.detalle.pileta === action.payload
          );

          return {
            ...state,
            filteredData: filteredByPileta,
          };
 

      case FILTER_BY_FONDO:
        // Lógica para filtrar inmuebles por la presencia de un fondo
        const filteredByFondo = state.producto.filter((properties) => properties.detalle.fondo === action.payload);


        return {...state,
            filteredData: filteredByFondo };



      case ORDER_BY_RESENA:
        // Lógica para ordenar inmuebles por reseña
        const sortByResena = [...state.filteredData].sort((a, b) =>
        b.puntuacion - a.puntuacion
      );
      return {
        ...state,
        filteredData: sortByResena,
      };

      
        
          case FILTER_BY_CATEGORIA:
            // Lógica para filtrar inmuebles por categoría (casa o departamento)
            const categoria = payload?.type; // Usamos el operador de encadenamiento opcional para manejar posibles valores nulos o indefinidos
            console.log('Acción en reducer:', type);
      
            if (!categoria || categoria === "default") {
              return {
                ...state,
                filteredData: state.allproperties, // Usamos allproperties en lugar de properties para obtener todos los elementos
              };
            } else {
              const filteredByCategoria = state.allproperties.filter(
                (property) => property.type === categoria
              );
              return {
                ...state,
                filteredData: filteredByCategoria,
              };
            }

            
    default:
      return {
        ...state,
      };
  }
};


export default rootReducer;