import axios from "axios";
import { BASE_API_URL, header, headerWithAuthorization } from "../constant/api";
export const signUp = async (payload) => {
	try {
		const response = await axios.post(`${BASE_API_URL}open/store`, payload, header)
		return response
	} catch (err) {
		throw err
	}
}

export const signIn = async (payload) => {
	try {
		const response = await axios.post(`${BASE_API_URL}open/authenticate`, payload, header)
		return response
	} catch (err) {
		throw err
	}
}

export const generateOtp = async (phone) => {
	try {
		const response = await axios.get(`${BASE_API_URL}open/generateOtp?mob=${phone}`, header)
		return response
	} catch (err) {
		throw err
	}
}

export const getCustomer = async (storeId) => {
	try {
		const response = await axios.get(`${BASE_API_URL}customer/storeId/${storeId}`, headerWithAuthorization(storeId));
		return response
	} catch (err) {
		throw err
	}
}

export const addCustomer = async (payload, storeId) => {
	try {
		const response = await axios.post(`${BASE_API_URL}customer`, payload, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}
export const getRoomList = async (storeId) => {
	try {
		const response = await axios.get(`${BASE_API_URL}lots/available/store/${storeId}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const getCustomerDetail = async (phone) => {
	try {
		const response = await axios.get(`${BASE_API_URL}customer/phone/${phone}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const getProductType = async () => {
	try {
		const response = await axios.get(`${BASE_API_URL}product/lookup`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const getAvailableLots = async (roomNo, storeId) => {
	try {
		const response = await axios.get(`${BASE_API_URL}lots/lotDetails/${roomNo}/store/${storeId}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const addInventory = async (payload) => {
	try {
		const response = await axios.post(`${BASE_API_URL}/productin`, payload, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}


export const getLotsDetail = async (storeId) => {
	try {
		const response = await axios.get(`${BASE_API_URL}productIn/lookup?storeId=${storeId}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const outInventory = async (payload) => {
	try {
		const response = await axios.post(`${BASE_API_URL}/productout`, payload, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}
