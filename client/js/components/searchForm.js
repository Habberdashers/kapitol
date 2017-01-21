import React from 'react';
import {hashHistory} from 'react-router';

const SearchForm = (props) => {
	let searchTerm;

	function grabInput (event) {
		event.preventDefault();
		console.log(searchTerm.value);
		hashHistory.push('/member');

	}

	return (
		<div className="search-container">
			<form className="search-form"  onSubmit={grabInput}>
	  			<input className="user-input-box" type="text" placeholder="" ref={element => searchTerm = element} />
			</form>
		</div>
	)
}

export default SearchForm;

//<input className="submit-button" type="submit" value="Submit" />
