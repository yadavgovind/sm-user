import { addInventory, getAvailableLots, getCustomerDetail, getLotsDetail, getProductType } from "../../../service/api"
import { toast } from "react-toastify";
import { addCustomerApi } from "../../customer/handler";
import { tokenDecode } from "../../../constant/api";
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

export const addInventoryApi = async (payload) => {
	try {
		const response = await addInventory(payload)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}
export const handleOnChangeCustomer = (e, state, setState) => {
	const name = e.target.name;
	const value = e.target.value;
	setState({ ...state, [name]: value })
}

export const handleCustomerSubmit = async (state, openModal) => {
	let detail = tokenDecode()
	const payload = { ...state, 'storeId': detail.storeId }
	addCustomerApi(payload, sessionStorage.getItem('token')).then((res) => {
		openModal("add-inventory")
		toast.success('Customer added successfully')
	}).catch((err) => {
		toast.error(err.message)
		// openModal("add-inventory")
	})

}

export const getLotsDetailApi = async (storeId, searchUser) => {
	try {
		const response = await getLotsDetail(storeId, searchUser)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}