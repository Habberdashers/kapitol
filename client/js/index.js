import 'babel-polyfill';

console.log(`Client running in ${process.env.NODE_ENV} mode`);

import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from './components/pageContainer';
import SearchForm from './components/searchForm';
import store from './store';
import {Provider} from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';


document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={PageContainer} />
				<Route path="/test" component={SearchForm} />
			</Router>
		</Provider>,
	document.getElementById('app'))});
