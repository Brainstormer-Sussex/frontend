import {
	GENERAL_CONSTANTS,
} from '../actionType'

export const generalAction = {
	SHOW_LOADER,
	HIDE_LOADER,
}

function SHOW_LOADER() {
	return (dispatch) => {
		dispatch(request())
	}

	function request() {
		return { type: GENERAL_CONSTANTS.SHOW_LOADER }
	}
}

function HIDE_LOADER() {
	return (dispatch) => {
		dispatch(request())
	}

	function request() {
		return { type: GENERAL_CONSTANTS.HIDE_LOADER }
	}
}