import axios from "axios";

const headers_default = () => {
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${atob(localStorage.token)}`,
		Accept: "application/json",
		"X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
	};
};

export const api_axios = (method, query, data, headers = headers_default()) => {
	// console.log(query);
	return axios({
		method: `${method}`,
		url: `http://localhost:8080/api${query}`,
		data: data,
		headers: headers,
	});
};

export const params_axios = (query, params, headers = headers_default()) => {
	// console.log(query);
	return axios.get(`http://localhost:8080/api${query}`, {
		params,
		headers,
	});
};
