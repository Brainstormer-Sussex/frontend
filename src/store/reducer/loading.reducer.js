import { GENERAL_CONSTANTS } from "../actionType"

const initState = {
	loading: false,
}
const loadingReducer = (state = initState, action) => {
	switch (action.type) {
		case GENERAL_CONSTANTS.SHOW_LOADER:
			return {
				...state,
				loading: true,
			}
		case GENERAL_CONSTANTS.HIDE_LOADER:
			return {
				...state,
				loading: false,
			}
		default:
			return state
	}
}

export default loadingReducer
