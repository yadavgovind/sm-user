import { toast } from "react-toastify";
import { signUp } from "../../service/api";

const handlePayload = (payload) => {
	{
		let arrObj = []
		payload.roomDetails && payload.roomDetails.map((room, i) => {
			arrObj.push({ ...room, roomNo: i + 1 })
		})
		return { ...payload, roomDetails: [...arrObj] }
	}
}
export const postSignUpApi = async (payload, setSubmit) => {
	payload = handlePayload(payload)
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
