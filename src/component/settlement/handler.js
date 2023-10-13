import { getLotScheduled, getSoldSchedule } from "../../service/api"

export const getSoldScheduleApi = async (storeId) => {
	try {
		const response = await getSoldSchedule(storeId)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}

export const getLotScheduleApi = async (id) => {
	try {
		const response = await getLotScheduled(id)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}