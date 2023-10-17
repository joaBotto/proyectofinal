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
  GET_ALL_USERS,
  USER_EDITED,
  RESET_STATE,
} from "./actions_types";

const initialState = {
  error: "",
  allUsers: [],
  users: [],
  user: "",
  properties: [],
  allproperties: [],
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
        filteredData: [...payload],
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

    case ERROR:
      return {
        ...state,
        error: payload,
        userCreated: null,
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
        userCreated: payload,
        error: null,
      };

    case USER_LOGIN:
      return {
        ...state,
        user: payload,
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

    case USER_EDITED:
      const indexAll = state.allUsers.indexOf(payload._id);
      const copyAllUsers = state.allUsers;
      copyAllUsers.splice(indexAll, 1, payload);
      const index = state.users.indexOf(payload._id);
      const copyUsers = state.users;
      copyUsers.splice(index, 1, payload);
      return {
        ...state,
        user: payload,
        allUsers: copyAllUsers,
        users: copyUsers,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: payload,
        users: payload,
      };

    case RESET_STATE:
      return initialState;

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
