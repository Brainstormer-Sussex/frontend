import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise'

import rootReducer from './reducer/rootReducer'

const loggerMiddleware = createLogger()
let middleware = applyMiddleware(promiseMiddleware, ReduxThunk, loggerMiddleware)

const store = createStore(rootReducer, middleware)
let persistor = persistStore(store)

export { store, persistor }