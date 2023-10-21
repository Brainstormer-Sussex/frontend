import { ALERT_CONSTANTS } from '../actionType'

const initState = {
	type: '',
	message: '',
	description: '',
	status: '',
}
const alertReducer = (state = initState, action) => {
	switch (action.type) {
		case 'RESET':
			return initState

		case ALERT_CONSTANTS.SUCCESS:
			return {
				...state,
				type: 'success',
				message: action.message,
			}
		case ALERT_CONSTANTS.ERROR:
			return {
				...state,
				type: 'error',
				message: action.message,
				description: action?.description,
				status: action?.status,
			}
		case ALERT_CONSTANTS.WARNING:
			return {
				...state,
				type: 'warning',
				message: action.message,
			}
		case ALERT_CONSTANTS.INFO:
			return {
				...state,
				type: 'info',
				message: action.message,
			}
		case ALERT_CONSTANTS.CLEAR:
			return {
				...initState,
				clearAll: true,
			}
		default:
			return state
	}
}

export default alertReducer
