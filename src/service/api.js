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
		const response = await axios.post(`${BASE_API_URL}customer`, payload, headerWithAuthorization(storeId));
		return response
	} catch (err) {
		throw err
	}
}