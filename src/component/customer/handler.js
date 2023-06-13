import axios from "axios";
import { BASE_API_URL, headerWithAuthorization } from '../../constant/api';


export const addCustomerApi = async (payload, storeId) => {
	try {
		const response = await axios
			.post(`${BASE_API_URL}customer`, payload, headerWithAuthorization(storeId));
		if (response && response.data) {
			console.log('response.data', response.data)
			return
		}
	} catch (err) {
		console.log(err)
	}
}
