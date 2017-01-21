import React from 'react';

function searchDropDown (props) {
	return (
	<input list="heroes" type="text" id="searchBar">
		<datalist id="heroes">
			<option value="Abaddon"></option>
			<option value="Alchemist"></option>
			<option value="Ancient Apparition"></option>
			<option value="Anti-Mage"></option>
			<option value="Axe"></option>
			<option value="Bane"></option>
		</datalist>
	)
}

export default searchDropDown; 