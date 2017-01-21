
import 'isomorphic-fetch'

export const getMemberDisplay = (name) => dispatch => {
	return fetch(`api/members/get-members/${name}`)
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

export const getBarData = (id) => dispatch => {
	return fetch(`barData/${id}`)
	.then (res => {
		if (!res.ok) {
			throw new Error (res.status); 
		}
		return res.json(); 
	}).then(res => {
		dispatch(barDataSuccess(res))
	}).catch(err => {
		dispatch(barDataError(err))
	});
}

export const getLineData = (id) => dispatch => {
	return fetch(`lineData/${id}`)
	.then (res => {
		if (!res.ok) {
			throw new Error (res.status); 
		}
		return res.json(); 
	}).then(res => {
		dispatch(lineDataSuccess(res))
	}).catch(err => {
		dispatch(lineDataError(err))
	});
}

export const BAR_DATA_SUCCESS = 'BAR_DATA_SUCCESS';
export const barDataSuccess = barData => ({
	type: BAR_DATA_SUCCESS, 
	barData
})

export const BAR_DATA_ERROR = 'BAR_DATA_ERROR'; 
export const barDataError = error => ({
	type: BAR_DATA_ERROR, 
	error
});


export const LINE_DATA_SUCCESS = 'LINE_DATA_SUCCESS';
export const lineDataSuccess = lineData => ({
	type: LINE_DATA_SUCCESS, 
	lineData
})

export const LINE_DATA_ERROR = 'LINE_DATA_ERROR'; 
export const lineDataError = error => ({
	type: LINE_DATA_ERROR, 
	error
});


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

