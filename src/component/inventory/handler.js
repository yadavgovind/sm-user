import { getAvailableLots, getCustomerDetail, getProductType } from "../../service/api"
import { toast } from "react-toastify";
export const handleBlur = (value, setState) => {
	value && getCustomerDetailApi(value).then((res) => {
		res ? setState(res) : toast.error("No record found, please add this customer.")
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

export const getProductTypeApi = async (phone) => {
	try {
		const response = await getProductType()
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