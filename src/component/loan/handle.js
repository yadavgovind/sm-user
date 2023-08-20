import { addLoan, getLoanDetail } from "../../service/api"

export const addLoanApi = async (payload, token) => {
	try {
		const response = await addLoan(payload, token)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}
export const getLoanDetailApi = async (storeId) => {
	try {
		const response = await getLoanDetail(storeId)
		if (response && response.data) {
			return response.data
		}
	} catch (err) {
		throw err
	}
}

