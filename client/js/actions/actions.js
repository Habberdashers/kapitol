
import 'isomorphic-fetch'

export const getApiData = () => dispatch => {
	return fetch("/api")
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