import { getDashboardCount, getProductInCount, getProductOutCount } from "../../service/api";

export const getDashboardCountApi = async (year) => {
	try {
		const response = await getDashboardCount(year)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}

export const getProductInCountApi = async (type, value) => {
	try {
		const response = await getProductInCount(type, value)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}

export const getProductOutCountApi = async (type, value) => {
	try {
		const response = await getProductOutCount(type, value)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}