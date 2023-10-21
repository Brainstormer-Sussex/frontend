import { ALERT_CONSTANTS } from '../actionType'

export const alertActions = {
	success,
	warning,
	error,
	secondary,
	clear,
	info,
}

function success(message) {
	setTimeout(() => {
		return { type: ALERT_CONSTANTS.CLEAR }
	}, 3000)
	return { type: ALERT_CONSTANTS.SUCCESS, message }
}

function error(message, description = '', status = '') {
	setTimeout(() => {
		return { type: ALERT_CONSTANTS.CLEAR }
	}, 3000)
	return { type: ALERT_CONSTANTS.ERROR, message, description, status }
}

function secondary(message) {
	setTimeout(() => {
		return { type: ALERT_CONSTANTS.CLEAR }
	}, 3000)
	return { type: ALERT_CONSTANTS.SECONDARY, message }
}

function warning(message) {
	setTimeout(() => {
		return { type: ALERT_CONSTANTS.CLEAR }
	}, 3000)
	return { type: ALERT_CONSTANTS.WARNING, message }
}

function info(message) {
	setTimeout(() => {
		return { type: ALERT_CONSTANTS.CLEAR }
	}, 3000)
	return { type: ALERT_CONSTANTS.INFO, message }
}

function clear() {
	return { type: ALERT_CONSTANTS.CLEAR }
}
