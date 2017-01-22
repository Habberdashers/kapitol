import * as actions from '../actions/actions';
import { combineReducers } from 'redux';
import update from 'immutability-helper';

let initialState = {
	member: [], 
	barData: [],
	lineData: []
}

export const reducer = (state = initialState, action) => {
	if (action.type === actions.MEMBER_DISPLAY_SUCCESS) {
		return update(state, {member: {$set: action.memberData.payload}})  
	}
	else if (action.type === actions.BAR_DATA_SUCCESS) {
		return update(state, {barData: {$set: action.barData.payload}})
	}
	else if (action.type === actions.LINE_DATA_SUCCESS) {
		return update(state, {lineData: {$set: action.lineData.payload}})
	}
	return state; 
}


// barData: [
//         {
//             label: "Abortion",
//             value: 10
//         },
//         {   
//             label: "Gun Rights",
//             value: 84
//         }, 
//         {
//             label: "Gay Marriage", 
//             value: 46
//         }, 
//         {
//             label: "Health Care", 
//             value: 38
//         }, 
//         {   
//             label: "Climate Change", 
//             value: 41
//         }
//     ],