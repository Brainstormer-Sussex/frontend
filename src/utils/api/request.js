import axios from 'axios'

var mainInstance = axios.create({
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})

const makeRequest =
	(instance) =>
	(method, url, authToken, ...params) => {
		// Add a response interceptor
		instance.interceptors.response.use(
			(response) => {
				// trigger 'loading=false' event here
				return Promise.resolve(response)
			},
			(error) => {
				return Promise.reject(error)
			}
		)
		return instance[method](url, ...params)
	}

const API_REQUEST =
	(method, url, authToken = false) =>
	(...params) => {
		return makeRequest(mainInstance)(
			method,
			url,
			authToken,
			...params
		)
	}
export default API_REQUEST
