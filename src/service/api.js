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

export const addCustomer = async (payload) => {
	try {
		const response = await axios.post(`${BASE_API_URL}customer`, payload, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}
export const getAvailableList = async (storeId) => {
	try {
		const response = await axios.get(`${BASE_API_URL}lots/available/store/${storeId}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}
export const getRoomList = async (storeId) => {
	try {
		const response = await axios.get(`${BASE_API_URL}lots/full/store/${storeId}`, headerWithAuthorization());
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
		const response = await axios.post(`${BASE_API_URL}productin`, payload, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}


export const getLotsDetail = async (storeId, searchUser) => {
	const query = searchUser ? `storeId=${storeId}&customerId=${searchUser}` : `storeId=${storeId}`
	try {
		const response = await axios.get(`${BASE_API_URL}productIn/lookup?${query}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const outInventory = async (payload) => {
	try {
		const response = await axios.post(`${BASE_API_URL}productout`, payload, header);
		return response
	} catch (err) {
		throw err
	}
}

export const addLoan = async (payload) => {
	try {
		const response = await axios.post(`${BASE_API_URL}customerloan`, payload, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const soldSchedule = async (payload) => {
	try {
		const response = await axios.post(`${BASE_API_URL}soldSchedule`, payload, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const getSuppliers = async (storeId) => {
	try {
		const response = await axios.get(`${BASE_API_URL}customer/storeId/${storeId}?roleType=supplier`, headerWithAuthorization(storeId));
		return response
	} catch (err) {
		throw err
	}
}

export const getLoanDetail = async (storeId) => {
	try {
		const response = await axios.get(`${BASE_API_URL}customerloan/storeId/${storeId}`, headerWithAuthorization(storeId));
		return response
	} catch (err) {
		throw err
	}
}

export const getDashboardCount = async (year) => {
	try {
		const response = await axios.get(`${BASE_API_URL}dashboardCount/session/${year}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}


export const getProductInCount = async (type, value) => {
	try {
		const response = await axios.get(`${BASE_API_URL}productInCount/identifierType/${type}/identifier/${value}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const getProductOutCount = async (type, value) => {
	try {
		const response = await axios.get(`${BASE_API_URL}productOutCount/identifierType/${type}/identifier/${value}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const getCustomerOnSearch = async (searchValue) => {
	try {
		const response = await axios.get(`${BASE_API_URL}customer/dynamicSearch/${searchValue}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const getSoldSchedule = async (storeId) => {
	try {
		const response = await axios.get(`${BASE_API_URL}soldSchedule/storeId/${storeId}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const getLotScheduled = async (id) => {
	try {
		const response = await axios.get(`${BASE_API_URL}items/lotScheduleId/${id}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}

export const getAverageRate = async (averageRate, storeCharge) => {
	try {
		const response = await axios.get(`${BASE_API_URL}customerResponse/session/2023/averageRate/${averageRate}?stroeCharge=${storeCharge}`, headerWithAuthorization());
		return response
	} catch (err) {
		throw err
	}
}
