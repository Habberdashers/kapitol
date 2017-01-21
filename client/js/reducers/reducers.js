import * as actions from '../actions/actions';
import { combineReducers } from 'redux';

export const reducer = (state = {}, action) => {
	if (action.type === actions.GET_API_SUCCESS) {
		return Object.assign({}, state, action.data);  
	}
	return state; 
}