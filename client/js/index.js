import 'babel-polyfill';

console.log(`Client running in ${process.env.NODE_ENV} mode`);

import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from './components/pageContainer';
import Mission from './components/mission';
import store from './store';
import {Provider} from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';


document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={PageContainer} />
				<Route path="/about" component={Mission} />
			</Router>
		</Provider>,
	document.getElementById('app'))});
