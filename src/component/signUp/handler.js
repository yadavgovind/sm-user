import { toast } from "react-toastify";
import { signUp } from "../../service/api";

export const postSignUpApi = async (payload, setSubmit) => {
	signUp(payload)
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
