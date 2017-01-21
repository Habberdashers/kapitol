import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import SearchForm from './searchForm';
import Header from './header';

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
				<Header/>
				<div className="member-info-container">
					<img className="member-picture" src="http://paulryan.house.gov/uploadedphotos/highresolution/3f3943d8-cea4-4f6b-96ac-3c25fd3ef24e.jpg"/>
					<div className="member-stats">
						{memberData}
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
	member: [state.member]
})

export default connect(mapStateToProps)(MemberPage);
