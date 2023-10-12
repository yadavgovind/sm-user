import axios from "axios";
import { BASE_API_URL } from '../../constant/api';
import history from '../../store/history';
import { header } from "../../constant/api";
import { signIn, generateOtp } from "../../service/api";
import { parseJwt } from "../customer/handler";

export const postSignInApi = async (payload) => {
	try {
		const response = await signIn(payload)
		if (response && response.data) {
			sessionStorage.setItem("token", response.data.token);
			getApi()
			const detail = parseJwt(response.data.token)
			sessionStorage.setItem('storeId', detail["storeId "])
			sessionStorage.setItem('storeName', detail["storeName "].trim())
			const userType = detail['userType '].trim()
			if (userType === 'STORE') {
				history.push('/store/dashboard');
				window.location.reload();
			}
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
	generateOtp(phone)
		.then((response) => {
			setOtp(response.data)
			window.alert(response.data)
		}).catch(err => console.log(err));
}