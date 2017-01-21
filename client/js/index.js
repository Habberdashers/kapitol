import 'babel-polyfill';

console.log(`Client running in ${process.env.NODE_ENV} mode`);


import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from './components/pageContainer'
import store from './store';
import {Provider} from 'react-redux';


document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<PageContainer />
		</Provider>,
	document.getElementById('app'))});
