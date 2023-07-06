import { getRoomList } from "../../service/api"

export const getRoomDetailApi = async (storeId) => {
	try {
		const response = await getRoomList(storeId)
		if (response && response.data) {
			console.log('room list', response.data)
			return response.data
		}
	} catch (err) {
		console.log(err)
	}
}
