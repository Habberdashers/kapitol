import React from 'react';
import SearchForm from './searchForm';


const Header= (props) => {

  return(
    <div className="header">
    <img className="navigation-k" src="assets/kapitol-K.png" />
      <div className = "headSearch">
        <SearchForm/>
      </div>
    </div>
  )
}

export default Header;
