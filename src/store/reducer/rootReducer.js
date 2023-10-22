import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

import loadingReducer from './loading.reducer'
import alertReducer from './alert.reducer'
import chessboardReducer from './chessboard.reducer'

// const persistConfig = {
// 	key: 'config',
// 	storage: storage,
// 	whitelist: [
// 		'embedded',
// 	],
// }

const alertPersistConfig = {
	key: 'alert',
	storage: storage,
	whitelist: [],
}

const chessboardPersistConfig = {
	key: 'chessboard',
	storage: storage,
	whitelist: [
		'dimensions',
		'position',
		'allPermutations',
		'permutations',
		'resultFound'
	],
}


const rootReducer = combineReducers({
	loading: loadingReducer,
	chessboard: persistReducer(chessboardPersistConfig, chessboardReducer),
	alert: persistReducer(alertPersistConfig, alertReducer),
})

export default rootReducer
