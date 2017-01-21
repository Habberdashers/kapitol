import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import SearchForm from './searchForm';
import Header from './header';

class MemberPage extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		var memberData = this.props.member.map(function(member, idx) {
			console.log('member from map', member)
			return (
				<ul className="member-details" key={idx}>
					<li>{member.firstName} {member.lastName}</li>
					<li><strong>State | District:</strong> {member.state} | {member.district}</li>
					<li><strong>Party:</strong> {member.party}</li>
				</ul>
			)
		})
		return (
			<div className="members-container">
				<Header/>
				<div className="member-info-container">
					<img className="member-picture" src="http://paulryan.house.gov/uploadedphotos/highresolution/3f3943d8-cea4-4f6b-96ac-3c25fd3ef24e.jpg"/>
					<div className="member-details-container">
						{memberData}
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
	member: state.member
})

export default connect(mapStateToProps)(MemberPage);
