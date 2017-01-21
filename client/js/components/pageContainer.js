import React from 'react'; 
import SearchForm from './searchForm';
import { connect } from 'react-redux';
import * as actions from '../actions/actions'; 

class PageContainer extends React.Component {
	constructor (props) {
		super(props);
	}

	getApiData () {
		this.props.dispatch(actions.getApiData()); 
	}

	onSearchSubmit (searchTerm) {
		console.log('term', searchTerm); 
		this.props.dispatch(actions.getMemberData(searchTerm));
	}

	render () {
		return (
			<div className="landing-page">
				<h1>Kapitol</h1>
				<SearchForm onSubmit={this.onSearchSubmit.bind(this)}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	data: [state.data]
})

export default connect(mapStateToProps)(PageContainer);
//<button onClick={this.getApiData.bind(this)}>Get data</button>