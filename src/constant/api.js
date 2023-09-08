import jwt_decode from "jwt-decode";

export const BASE_API_URL = 'http://localhost:9999/api/'

export const header = {

	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "content-type",
		"Access-Control-Max-Age": "3600"
	}

}


export const headerWithAuthorization = () => {
	const token = sessionStorage.getItem('token')
	return {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
			// "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			// "Access-Control-Allow-Headers": "origin, content-type, accept, x-requested-with",
			"Authorization": `Bearer ${token}`
		}
	}
}

export const tokenDecode = () => {
	let payload = Object.entries(jwt_decode(sessionStorage.getItem('token'))).reduce((acc, curr) => {
		let [key, value] = curr;
		// Checking if the key is a string
		acc[typeof key === "string" ? key.trim() : key] = value;
		return acc;
	}, {})
	Object.keys(payload).forEach(k => payload[k] = typeof payload[k] == 'string' ? payload[k].trim() : payload[k]);

	return payload
}
