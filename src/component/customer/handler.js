import axios from "axios";
import { BASE_API_URL, headerWithAuthorization } from '../../constant/api';


export function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

export const addCustomerApi = async (payload, storeId) => {
	try {
		const response = await axios
			.post(`${BASE_API_URL}customer`, payload, headerWithAuthorization(storeId));
		if (response && response.data) {
			console.log('response.data', response.data)
			return
		}
	} catch (err) {
		console.log(err)
	}
}

export const getCustomerApi = async (storeId) => {
	try {
		const response = await axios
			.get(`${BASE_API_URL}customer/storeId/${storeId}`, headerWithAuthorization(storeId));
		if (response && response.data) {
			console.log('response.data', response.data)
			return
		}
	} catch (err) {
		console.log(err)
	}
}
