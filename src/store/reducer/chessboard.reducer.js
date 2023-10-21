import { CHESS_BOARD_CONSTANTS } from "../actionType"

const initState = {
	possiblePermutations: [],
}
const chessboardReducer = (state = initState, action) => {
	switch (action.type) {
		case CHESS_BOARD_CONSTANTS.POSSIBLE_PERMUTATIONS.REQUEST:
			return state
		case CHESS_BOARD_CONSTANTS.POSSIBLE_PERMUTATIONS.SUCCESS:
			return {
				...state,
				possiblePermutations: action.response,
			}
		case CHESS_BOARD_CONSTANTS.POSSIBLE_PERMUTATIONS.FAILURE:
			return state
		default:
			return state
	}
}

export default chessboardReducer
