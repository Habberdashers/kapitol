
import 'isomorphic-fetch'

// export const searchMemberData = (searchTerm) => dispatch => {
// 	return fetch(`/members/${searchTerm}`)
// 	.then(res => {
// 		if (!res.ok) {
// 			throw new Error (res.status); 
// 		}
// 		return res.json(); 
// 	}).then(res => {memberDisplaySuccess(res)
// 	}).catch(err => {
// 		dispatch(memberDisplayError(err)); 
// 	});
// }

export const getMemberDisplay = () => dispatch => {
	return fetch('/members')
	.then(res => {
		if (!res.ok) {
			throw new Error (res.status); 
		}
		return res.json(); 
	}).then(res => {
		dispatch(memberDisplaySuccess(res)); 
	}).catch(err => {
		dispatch(memberDisplayError(err)); 
	}); 
}


// export const GET_MEMBER_DISPLAY_SUCCESS = 'GET_MEMBER_DISPLAY_SUCCESS'; 
// export const getMemberDisplaySuccess = displayData => ({
// 	type: GET_MEMBER_DISPLAY_SUCCESS, 
// 	data
// }); 

// export const GET_MEMBER_DISPLAY_ERROR = 'GET_MEMBER_DISPLAY_ERROR'; 
// export const getMemberDisplayError = error => ({
// 	type: GET_MEMBER_DISPLAY_ERROR, 
// 	error
// });

export const MEMBER_DISPLAY_SUCCESS = 'MEMBER_DISPLAY_SUCCESS'; 
export const memberDisplaySuccess = memberData => ({
	type: MEMBER_DISPLAY_SUCCESS, 
	memberData
}); 

export const MEMBER_DISPLAY_ERROR = 'MEMBER_DISPLAY_ERROR'; 
export const memberDisplayError = error => ({
	type: MEMBER_DISPLAY_ERROR, 
	error
});

