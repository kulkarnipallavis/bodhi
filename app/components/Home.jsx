import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Paper from 'material-ui/Paper'
import {getOpenRequests, getAcceptedOffers} from '../reducers/home'
import Avatar from 'material-ui/Avatar'
// import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import { Table } from 'react-bootstrap'

const style = {
	container: {
	  height: 200,
	  width: 500,
	  margin: 20,
	  textAlign: 'center',
	  display: 'block'
	},

	link: {
		margin: 20,
		padding : 10,
		display: 'inline-block',
		textAlign: 'center',
		fontSize : 25
	},

	offer: {
		margin: 5,
		padding: 5,
		textAlign: 'center',
		fontSize: 20,
		color: '#533BD7'
	}

}

const mapStateToProps = (state) => {
	return {
		openRequests: state.home.openRequests,
		acceptedOffers: state.home.acceptedOffers,
		currentUser: state.currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getOpenRequestsDispatch: () => {
			dispatch(getOpenRequests())
		},
		getClosedRequestsDispatch: () => {
			dispatch(getAcceptedOffers())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(

class Home extends Component {
	render() {

	const openReq = this.props.openRequests
	const openReqKeys = openReq ? Object.keys(openReq) : []

	const acceptedOffers = this.props.acceptedOffers

	console.log("acceptedOffers",acceptedOffers)

	acceptedOffers.forEach(offer => {
		console.log("offer.keys",Object.keys(offer))
		console.log("offer.offUser.name", offer.offUser.name)
		console.log("offer.reqUser.name", offer.reqUser.name)
	})
	// const closedReqKeys = closedReq ? Object.keys(closedReq) : []
		return (
			<div className="gradient flex-container">
				<h1>Welcome Bodhi buddy!</h1>
				<div style={style.link}>
					<Link to="/request">Request Help</Link>
				</div>
				<div style={style.link}>
					<Link to="/offerhelp">Offer Help</Link>
				</div>
				
					<h1>Open Requests</h1>
				{
					openReqKeys && openReqKeys.map((reqKey, index) => (
						<div></div>
					))
				}
				
				<h1>Closed Requests</h1>
				
					<div className="flex-row"  className="gradient">
					<Table responsive={true} bordered={false}>
            		<tbody>
						{acceptedOffers && acceptedOffers.map((offer, index) =>(
							<tr key={index}>
								<td><Avatar size={40} src={offer.offUser.picture}/></td>
								<td>{`${offer.offUser.name} helped ${offer.reqUser.name}`}</td>
								<td><Avatar size={40} src={offer.reqUser.picture}/></td>
							</tr>
						))}

					</tbody>
     				</Table>
     				</div>
				
				
			</div>
		)
	}
})
