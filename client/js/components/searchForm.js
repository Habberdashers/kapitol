import React from 'react'; 

const SearchForm = (props) => {
	let searchTerm; 

	function grabInput (event) {
		event.preventDefault();
		props.onSubmit(searchTerm.value);
	}

	function onChange (event) {
		console.log(searchTerm.value);
	}

	return (
		<div className="search-container">
			<form className="search-form" onSubmit={grabInput}>
	  			<input className="user-input-box" type="text" onChange={onChange} placeholder="" ref={element => searchTerm = element} />
			</form>
		</div>
	)
}

export default SearchForm; 

//<input className="submit-button" type="submit" value="Submit" />