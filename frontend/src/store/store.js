import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import { watchLogin } from "./saga";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchLogin);

export default store;
