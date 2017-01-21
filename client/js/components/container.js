import React from 'react'; 
import { connect } from 'react-redux';
import * as actions from '../actions/actions'; 

class Container extends React.Component {
	constructor (props) {
		super(props);
	}

	getApiData () {
		this.props.dispatch(actions.getApiData()); 
	}

	render () {
		console.log(this.props)
		return (
			<div>
				<button onClick={this.getApiData.bind(this)}>Get data</button>
				<div className="results"></div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	data: [state.data]
})

export default connect(mapStateToProps)(Container);