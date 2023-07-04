import axios from "axios";
import { BASE_API_URL, header } from "../constant/api";
export const signUp = async (payload) => {
	try {
		const response = await axios.post(`${BASE_API_URL}open/store`, payload, header)
		return response
	} catch (err) {
		throw err
	}
}

