import axios from "axios";
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

const URL = "http://localhost:3001";

export const getProperties = () => async (dispatch) => {
	try {
		const { data } = await axios.get(`${URL}/properties`);
		dispatch({ type: GET_PROPERTIES, payload: data });
	} catch (error) {
		return { type: ERROR, payload: error.message };
	}
};

export const getPropertyDetail = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`${URL}/properties/${id}`);
		dispatch({ type: GET_PROPERTY_DETAIL, payload: data });
	} catch (error) {
		return { type: ERROR, payload: error.message };
	}
};

export const cleanDetail = () => (dispatch) => {
	dispatch({ type: CLEAN_DETAIL });
};

export const addUser = (user) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${URL}/users`, user);
		dispatch({ type: ADD_USER, payload: data });
	} catch (error) {
		return { type: ERROR, payload: error.message };
	}
};

export const userLogin = (user) => async (dispatch) => {
	try {
		const { data } = await axios.get(`${URL}/users`, user);
		dispatch({ type: USER_LOGIN, payload: data });
	} catch (error) {
		return { type: ERROR, payload: error.message };
	}
};

export const addProperty = (property) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${URL}/properties`, property);
		dispatch({ type: ADD_PROPERTY, payload: data });
	} catch (error) {
		return { type: ERROR, payload: error.message };
	}
};

export const cleanFilters = () => (dispatch) => {
	dispatch({ type: CLEAN_FILTERS });
};
