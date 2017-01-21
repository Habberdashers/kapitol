
import 'isomorphic-fetch'

export const getApiData = () => dispatch => {
	return fetch('/api')
	.then(res => {
		if (!res.ok) {
			throw new Error (res.status); 
		}
		return res.json(); 
	}).then(res => {
		dispatch(getApiSuccess(res)); 
	}).catch(err => {
		dispatch(getApiError(err)); 
	}); 
}

export const getMemberData = (searchTerm) => dispatch => {
	return fetch(`/members/${searchTerm}`)
	.then(res => {
		if (!res.ok) {
			throw new Error (res.status); 
		}
		return res.json(); 
	}).then(res => {console.log(res)
	}).catch(err => {
		dispatch(getMemberDataError(err)); 
	});
}

export const GET_API_SUCCESS = 'GET_API_SUCCESS'; 
export const getApiSuccess = data => ({
	type: GET_API_SUCCESS, 
	data
}); 

export const GET_API_ERROR = 'GET_API_ERROR'; 
export const getApiError = error => ({
	type: GET_API_ERROR, 
	error
});

export const GET_MEMEBER_DATA_SUCCESS = 'GET_MEMEBER_DATA_SUCCESS'; 
export const getMemberDataSuccess = memberData => ({
	type: GET_MEMEBER_DATA_SUCCESS, 
	memberData
}); 

export const GET_MEMBER_DATA_ERROR = 'GET_MEMBER_DATA_ERROR'; 
export const getMemberDataError = error => ({
	type: GET_MEMBER_DATA_ERROR, 
	error
});

