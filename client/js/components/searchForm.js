import React from 'react'; 

const SearchForm = (props) => {
	let input; 

	// function grabInput (event) {
	// 	event.preventDefault();
	// 	props.onSubmit(input.value)
	// }

	return (
		<form className="user-form" onSubmit={props.grabInput}>
  			<input className="user-input-box" type="text" placeholder="search..." ref={element => input = element} />
			<input className="submit-button" type="submit" value="Submit" />
		</form>

	)
}

export default SearchForm; 