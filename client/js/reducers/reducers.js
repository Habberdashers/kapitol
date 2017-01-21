import * as actions from '../actions/actions';
import { combineReducers } from 'redux';
import update from 'immutability-helper';

let initialState = {
	member: {}
}

export const reducer = (state = initialState, action) => {
	if (action.type === actions.MEMBER_DISPLAY_SUCCESS) {
		return update(state, {member: {$set: action.memberData}})  
	}
	return state; 
}