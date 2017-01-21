import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers/reducers';
import createLogger from 'redux-logger';

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers.reducer, composeEnhancers(
	applyMiddleware(thunk, logger)
));

