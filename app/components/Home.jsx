import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Paper from 'material-ui/Paper'
import {getOpenRequests, getClosedRequests} from '../reducers/home'
import { blueGrey500 } from 'material-ui/styles/colors'

const style = {
	container : {
	  height: 200,
	  width: 500,
	  margin: 20,
	  textAlign: 'center',
	  display: 'block',
	  color: blueGrey500
	},

	link : {
		margin: 20,
		padding : 10,
		display: 'inline-block',
		textAlign: 'center',
		fontSize : 25
	}

}

const mapStateToProps = (state) => {
	return {
		openRequests: state.home.openRequests,
		closedRequests: state.home.closedRequests,
		currentUser: state.currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getOpenRequestsDispatch: () => {
			dispatch(getOpenRequests())
		},
		getClosedRequestsDispatch: () => {
			dispatch(getClosedRequests())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(

class Home extends Component {
	render() {

	const openReq = this.props.openRequests
	const openReqKeys = openReq ? Object.keys(openReq) : []

	const closedReq = this.props.closedRequests
	const closedReqKeys = closedReq ? Object.keys(closedReq) : []
		return (
			<div>
				<h1>Welcome Bodhi buddy!</h1>
				<div style={style.link}>
					<Link to="/request">Need a Help</Link>
				</div>
				<div style={style.link}>
					<Link to="/offerhelp">Offer Help</Link>
				</div>
				<Paper style={style.container} zDepth={2} >
					<h1>Open Requests</h1>
				{
					openReqKeys && openReqKeys.map((reqKey, index) => (
						<div key={index}>{openReq[reqKey].title} {openReq[reqKey].tag} {openReq[reqKey].description}</div>
					))
				}
				</Paper>
				<Paper style={style.container} zDepth={2} >
					<h1>Closed Requests</h1>
					{
					closedReqKeys && closedReqKeys.map((reqKey, index) => (
						<div key={index}>{closedReq[reqKey].title} {closedReq[reqKey].tag} {closedReq[reqKey].description}</div>
					))
				}
				</Paper>
			</div>
		)
	}
})
