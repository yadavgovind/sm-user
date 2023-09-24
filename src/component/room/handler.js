import { getAvailableList, getRoomList } from "../../service/api"

export const getRoomDetailApi = async (storeId) => {
	try {
		const response = await getRoomList(storeId)
		if (response && response.data) {
			console.log('room list', response.data)
			return response.data
		}
	} catch (err) {
		throw err
	}
}

export const getAvailableListApi = async (storeId) => {
	try {
		const response = await getAvailableList(storeId)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}