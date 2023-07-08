import { getCustomerDetail, getProductType } from "../../service/api"

export const handleBlur = (value, setState) => {
	getCustomerDetailApi(value).then((res) => {
		setState(res)
	}).catch((err) => {
		console.log(err)
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