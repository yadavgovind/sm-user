import { getCustomerDetail, getAvailableLots, outInventory } from "../../../service/api"
import { toast } from "react-toastify";

export const handleBlur = (value, setState) => {
	value && getCustomerDetailApi(value).then((res) => {
		res ? setState(res) : toast.error("No record found.")
	}).catch((err) => {
		toast.error(err)
	})
}
export const getCustomerDetailApi = async (phone) => {
	try {
		const response = await getCustomerDetail(phone)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}

export const getAvailableLotsApi = async (roomNo, storeId) => {
	try {
		const response = await getAvailableLots(roomNo, storeId)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}

export const outInventoryApi = async (payload) => {
	try {
		const response = await outInventory(payload)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}