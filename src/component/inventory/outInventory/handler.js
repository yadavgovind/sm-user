import { getCustomerDetail, getAvailableLots, outInventory } from "../../../service/api"
import { toast } from "react-toastify";


export const getSupplier = (value, setState) => {
	value && getCustomerDetailApi(value).then((res) => {
		if (res && res.roleType === 'supplier') {
			setState(res)
		} else {
			toast.error("No supplier found with this number.")
		}
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
		await outInventory(payload)
	} catch (err) {
		console.log(err)
	}
}
