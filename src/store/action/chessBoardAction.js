import { CHESS_BOARD_CONSTANTS } from '../actionType'
import { generalAction } from './generalAction'
import { apiService } from '../middleware/api_service'
import { 
    CONSTANTS, HELPER
 } from '../../utils'
import { alertActions } from './alertAction'

export const chessBoardAction = {
	GENERATE_NQUEEN_PERMUTATION_CHESSBOARD,
	RESET_NQUEEN_PERMUTATION_CHESSBOARD
}

function RESET_NQUEEN_PERMUTATION_CHESSBOARD() {
	return (dispatch) => {
		dispatch(request())
	}
	function request() {
		return { type: CHESS_BOARD_CONSTANTS.RESET_CHESSBOARD }
	}
}

function GENERATE_NQUEEN_PERMUTATION_CHESSBOARD(requestData = {}) {
	return (dispatch, getState) => {
		dispatch(request(requestData))
		dispatch(generalAction.SHOW_LOADER())
		apiService
			.findPossiblePermutations(requestData)
			.then((response) => {
				const responseStatus = response?.data?.status
				if (
					HELPER.isNotEmpty(responseStatus) &&
					responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS
				) {
					const responseBody = response?.data?.body
					dispatch(generalAction.HIDE_LOADER())
					dispatch(success(responseBody))
				}
			})
			.catch((error) => {
				const error_response = error?.response
				const response = error_response?.data?.body
				const error_message = error_response?.data?.message
				dispatch(generalAction.HIDE_LOADER())
				if(HELPER.isNotEmpty(error_message)){
					dispatch(alertActions.error(error_message))
					alert(error_message);
				}
				dispatch(failure({ ...response, error_message: error_message }))
			})
	}
	function request(response) {
		return { type: CHESS_BOARD_CONSTANTS.POSSIBLE_PERMUTATIONS.REQUEST, response }
	}
	function success(response) {
		return {
			type: CHESS_BOARD_CONSTANTS.POSSIBLE_PERMUTATIONS.SUCCESS,
			response,
		}
	}
	function failure(response) {
		return { type: CHESS_BOARD_CONSTANTS.POSSIBLE_PERMUTATIONS.FAILURE, response }
	}
}