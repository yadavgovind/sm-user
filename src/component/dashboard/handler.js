import { getDashboardCount, getProductInCount, getProductOutCount } from "../../service/api";

export const getDashboardCountApi = async (storeId) => {
	try {
		const response = await getDashboardCount(storeId)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}

export const getProductInCountApi = async (storeId) => {
	try {
		const response = await getProductInCount(storeId)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}

export const getProductOutCountApi = async (storeId) => {
	try {
		const response = await getProductOutCount(storeId)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}