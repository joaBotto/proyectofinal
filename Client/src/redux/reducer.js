import {
  GET_PROPERTY,
  GET_PROPERTY_DETAIL,
  CREATE_PROPERTY,
  ADD_USER,
  FILTERS,
  CLEAN_DETAIL,
  ERROR,
  USER_LOGIN,
  PROPERTY_EDITED,
  CREATE_BOOKING,
  GET_ALL_BOOKINGS,
  GET_BOOKING,
  GET_ALL_USERS,
  USER_EDITED,
  RESET_STATE,
  PROPERTY_DAYS_EDITED,
  SAVE_PROPERTY,
  REMOVE_FROM_SAVED,
  USER_AUTHENTICATED,
  DELETE_PROPERTY
} from "./actions_types";

const initialState = {
  error: "",
  user: "",
  properties: [],
  allproperties: [],
  propertyDetail: {},
  searchTerm: "",
  bookings: [],
  allBookings: [],
  bookingDetail: {},
  details: [],
  savedProperties: [],
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

const filterSeachBar = (state, payload) => {
	let copyProperties = state.properties
	if (payload.search === "") {
	  return state.properties
	} else {
	  let filterResult = copyProperties.filter((prop) => {
		if ((prop.address.state && prop.address.state.toLowerCase().trim().includes(payload.search.toLowerCase().trim())) ||
		  (prop.address.country && prop.address.country.toLowerCase().trim().includes(payload.search.toLowerCase().trim()))) {
		  return prop
		}
	  });
	  if(filterResult.length === 0) {
		filterResult = copyProperties.filter((prop) => {
		  if (prop.title && prop.title.toLowerCase().trim().includes(payload.search.toLowerCase().trim())) {
			return prop
		  }
		});
	  }
	  return filterResult
	}
  }

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
				filteredData: [...payload],
			};

		case USER_AUTHENTICATED:
			return {
				...state,
				user: payload,
				savedProperties: [...payload.savedProperties]

			};

		case CREATE_PROPERTY:
			return {
				...state,
				allproperties: [...state.allproperties, payload],
				properties: [...state.properties, payload],
				user: {
					...state.user,
					properties: [...state.user.properties, payload._id],
				},
			};

		case GET_PROPERTY_DETAIL:
			return {
				...state,
				propertyDetail: payload,
			};

		case CLEAN_DETAIL:
			return {
				...state,
				propertyDetail: {},
			};

		case ERROR:
			return {
				...state,
				error: payload,
				userCreated: null,
			};

		case FILTERS:
			const filterPropertyForType = filterPropertyType(state, payload);
			const filterBySearchBar = filterSeachBar({
				...state,
				properties:filterPropertyForType
			}, payload)
			const orderPropertyForPrice = orderPropertyPrice(
				{
					...state,
					properties: filterBySearchBar,
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
				userCreated: payload,
				error: null,
			};

		case USER_LOGIN:
			console.log("ESTOY EN REDUCER",payload)
			return {
				...state,
				user: payload,
				savedProperties: [...payload.savedProperties]
			};

		case PROPERTY_EDITED:
			const allproperties = state.allproperties;
			const properties = state.properties;
			const allpropertiesFiltered = allproperties.filter(
				(property) => property._id !== payload._id
			);
			const propertiesFiltered = properties.filter(
				(property) => property._id !== payload._id
			);
			return {
				...state,
				allproperties: [...allpropertiesFiltered, payload],
				properties: [...propertiesFiltered, payload],
			};

		case PROPERTY_DAYS_EDITED:
			const { propertyId, updatedAvailableDays } = payload;

			const allpropertiesDays = state.allproperties.map((property) => {
				if (property._id === propertyId) {
					return {
						...property,
						availableDays: updatedAvailableDays,
					};
				}
				return property;
			});

			const propertiesDays = state.properties.map((property) => {
				if (property._id === propertyId) {
					return {
						...property,
						availableDays: updatedAvailableDays,
					};
				}
				return property;
			});

			const updatedPropertyDetail =
				state.propertyDetail._id === propertyId
					? { ...state.propertyDetail, availableDays: updatedAvailableDays }
					: state.propertyDetail;

			return {
				...state,
				allproperties: allpropertiesDays,
				properties: propertiesDays,
				propertyDetail: updatedPropertyDetail,
			};

		case CREATE_BOOKING:
			return {
				...state,
				bookings: [...state.bookings, action.payload],
				allBookings: [...state.allBookings, action.payload],
			};

		case GET_ALL_BOOKINGS:
			return {
				...state,
				bookings: [...payload],
				allBookings: [...payload],
			};

		case GET_BOOKING:
			return {
				...state,
				bookingDetail: payload,
			};

		case USER_EDITED:
			const indexAll = state.allUsers.indexOf(payload._id);
			const copyAllUsers = state.allUsers;
			copyAllUsers.splice(indexAll, 1, payload);
			const index = state.users.indexOf(payload._id);
			const copyUsers = state.users;
			copyUsers.splice(index, 1, payload);
			const userCopy = payload;
			return {
				...state,
				user: userCopy,
				allUsers: copyAllUsers,
				users: copyUsers,
			};

		case GET_ALL_USERS:
			return {
				...state,
				allUsers: payload,
				users: payload,
			};
    
    case SAVE_PROPERTY:
      const propertyToAdd = state.allproperties.find(
        (prop) => prop._id === payload
      );

      return {
        ...state,
        savedProperties: [...state.savedProperties, propertyToAdd],
        user: {
          ...state.user,
          savedProperties: [...state.user.savedProperties, propertyToAdd],
        },
      };

    case REMOVE_FROM_SAVED:
      // Filtrar la propiedad a eliminar de la lista de propiedades guardadas
      const updatedSavedProperties = state.savedProperties.filter(
        (prop) => prop._id !== payload
      );

      return {
        ...state,
        savedProperties: updatedSavedProperties,
        user: { ...state.user, savedProperties: updatedSavedProperties },
      };

	  case DELETE_PROPERTY:
		const copyAllProperties = state.allproperties.filter((property) => property._id !== payload._id);
		const copyProperties = state.properties.filter((property) => property._id !== payload._id);
		const updatePropertyUser = state.user.properties.filter((e) => e !== payload._id)
		const updateSavedProperty = state.user.savedProperties.filter((e) => e !== payload._id)
		return {
			...state,
			allproperties: copyAllProperties,
			properties: copyProperties,
			user: {
				...state.user,
				properties: updatePropertyUser,
				savedProperties: updateSavedProperty
			}
		}

		case RESET_STATE:
			return initialState;

		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
