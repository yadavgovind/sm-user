import axios from "axios";
import { BASE_API_URL } from '../../constant/api';
import history from '../../store/history';
import { header } from "../../constant/api";

export const postSignInApi = async (payload) => {
	try {
		const response = await axios
			.post(`${BASE_API_URL}open/authenticate`, payload, header);
		if (response && response.data) {
			sessionStorage.setItem("token", response.data.token);
			getApi()
			history.push('/store');
			window.location.reload();
		}
	} catch (err) {
		console.log(err)
	}
}

export const getApi = async (payload) => {
	axios
		.get(`${BASE_API_URL}hello`, header)
		.then((response) => {
			console.log(response)
		}).catch(err => console.log(err));
}

export const generateOtpApi = async (phone, setOtp) => {
	axios
		.get(`${BASE_API_URL}open/generateOtp?mob=${phone}`, header)
		.then((response) => {
			setOtp(response.data)
			window.alert(response.data)
		});
}