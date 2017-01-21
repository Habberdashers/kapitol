import React from 'react'; 
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

class MemberPage extends React.Component {
	constructor (props) {
		super(props); 
	}

	componentWillMount () {
		this.props.dispatch(actions.getMemberDisplay()); 
	}

	render () {
		console.log('member', this.props.member)
			var memberData = this.props.member.map(function(memberObj, idx) {
				return (
					<ul key={idx}>
						<li> {memberObj.name}</li>
						<li>{memberObj.state}</li>
						<li>{memberObj.district}</li>
						<li>{memberObj.party}</li>
					</ul>
				)
			})
		return (
			<div className="members-container">
				<ul>
					{memberData}
				</ul>
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
	member: [state.member]
})

export default connect(mapStateToProps)(MemberPage);