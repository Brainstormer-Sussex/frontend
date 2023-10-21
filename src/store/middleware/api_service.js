import { API_REQUEST } from '../../utils'

const baseURL = `http://brainstormers-backend.test`;//process.env.REACT_APP_API_BASE_URL

export const apiService = {
	findPossiblePermutations,
}

async function findPossiblePermutations(requestData) {
	let response = await API_REQUEST(
		'post',
		`${baseURL}/api/find-possible-permutations`,
		false
	)(requestData)
	return response
}
