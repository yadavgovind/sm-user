import axios from "axios";
import { BASE_API_URL, header } from "../../constant/api";
import { toast } from "react-toastify";

export const postSignUpApi = async (payload, setSubmit) => {
	axios
		.post(`${BASE_API_URL}open/store`, payload, header)
		.then((response) => {
			console.log(response.data);
			setSubmit(false)
			toast.success("Register successfully")
		}).catch(err => {
			console.log(err)
			setSubmit(false)
			toast.error(err.message)
		});
}
