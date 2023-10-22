import { CHESS_BOARD_CONSTANTS } from "../actionType"

const initState = {
	dimensions: 0,
	position: [],

	allPermutations: [],
	permutations: [],
	resultFound: false,
	searching: false,
	error: '',
}
const chessboardReducer = (state = initState, action) => {
	switch (action.type) {
		case CHESS_BOARD_CONSTANTS.RESET_CHESSBOARD:
			return initState;
		case CHESS_BOARD_CONSTANTS.POSSIBLE_PERMUTATIONS.REQUEST:
			return {
				...state,
				resultFound: false,
				searching: true,
				dimensions: action?.response?.dimensions,
				position: action?.response?.position,
			}
		case CHESS_BOARD_CONSTANTS.POSSIBLE_PERMUTATIONS.SUCCESS:
			return {
				...state,
				resultFound: true,
				searching: false,
				allPermutations: action.response?.allSolutions,
				permutations: action.response?.solutions,
			}
		case CHESS_BOARD_CONSTANTS.POSSIBLE_PERMUTATIONS.FAILURE:
			return {
				...state,
				resultFound: true,
				searching: false,
				error: action.message,
				allPermutations: action.response?.allSolutions,
				permutations: action.response?.solutions,
			}
		default:
			return state
	}
}

export default chessboardReducer
