import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {getOpenRequests, getClosedRequests} from '../reducers/home';
import { blueGrey500 } from 'material-ui/styles/colors';

const style = {
	  height: 200,
	  width: 500,
	  margin: 20,
	  textAlign: 'center',
	  display: 'block',
	  color: blueGrey500
	};

const mapStateToProps = (state) => {
	return {
		openRequests: state.home.openRequests,
		closedRequests: state.home.closedRequests
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getOpenRequestsDispatch: () => {
			dispatch(getOpenRequests());
		},
		getClosedRequestsDispatch: () => {
			dispatch(getClosedRequests());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(

class Home extends Component {
	render() {

	const openReq = this.props.openRequests;
	const openReqKeys = Object.keys(openReq);

	const closedReq = this.props.closedRequests;
	const closedReqKeys = Object.keys(closedReq);

		return (
			<div>
				<Paper style={style} zDepth={2} >
					<h1>Open Requests</h1>
				{
					openReqKeys.map((reqKey, index) => (
						<div key={index}>{openReq[reqKey].title} {openReq[reqKey].tag} {openReq[reqKey].description}</div>
					))
				}
				</Paper>
				<Paper style={style} zDepth={2} >
					<h1>Closed Requests</h1>
					{
					closedReqKeys.map((reqKey, index) => (
						<div key={index}>{closedReq[reqKey].title} {closedReq[reqKey].tag} {closedReq[reqKey].description}</div>
					))
				}
				</Paper>
			</div>
		);
	}
});
