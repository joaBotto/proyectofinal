import {
	GET_PROPERTIES,
	GET_PROPERTY_DETAIL,
	CLEAN_DETAIL,
	ADD_USER,
	USER_LOGIN,
	ADD_PROPERTY,
	CLEAN_FILTERS,
	ERROR,
} from "./actions_types";

const initialState = {
	properties: [],
	allProperties: [],
	propertyDetail: {},
	user: {},

	filters: [],
	errors: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_PROPERTIES:
			return {
				...state,
				properties: payload,
				allProperties: payload,
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
		case ADD_USER:
			return {
				...state,
				user: payload,
			};
		case ADD_PROPERTY:
			return {
				...state,
				properties: [...state.properties, payload],
				allProperties: [...state.allProperties, payload],
			};
		case CLEAN_FILTERS:
			return {
				...state,
				properties: state.allProperties,
				filters: [],
			};
		default:
			return state;
	}
};

export default rootReducer;
