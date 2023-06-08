import axios from "axios";
import { BASE_API_URL } from '../../constant/api';
import { header } from "../../constant/api";

export const addCustomerApi = async (payload, storeId) => {
	try {
		const response = await axios
			.post(`${BASE_API_URL}customer`, payload, { ...header, "Authorization": `Bearer ${storeId}` });
		if (response && response.data) {
			console.log('response.data', response.data)
			return
		}
	} catch (err) {
		console.log(err)
	}
}
