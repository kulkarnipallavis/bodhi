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
		textAlign: 'center',
		display: 'inline-block',	
		fontSize : 25
	},

	offer: {
		margin: 5,
		padding: 5,
		textAlign: 'center',
		fontSize: 20,
		color: '#533BD7'
	},

	header: {
		fontSize: 30,
		color: 'white',
		textAlign: 'center'
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

	constructor(props){
		super(props)
		this.getOffersAndRequests = this.getOffersAndRequests.bind(this)
	}

	getOffersAndRequests(){
		const requests = this.props.openRequests
		const offers = this.props.acceptedOffers

		const mergedReqAndOffers = [...requests, ...offers]
		//requets have date, offers have dateAccepted

		mergedReqAndOffers.sort(function compare(req, offer){
			return req.date - offer.dateAccepted
		})

		return mergedReqAndOffers;
	}

	render() {

	console.log("getOffersAndRequests",this.getOffersAndRequests())
	const mergedReqAndOffers = this.getOffersAndRequests()
	
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
				
				<div style={style.header} >Recent Activity</div>
					<div className="flex-row"  className="gradient">
					<Table responsive={true} bordered={false}>
            		<tbody>
						{
							mergedReqAndOffers && mergedReqAndOffers.map((reqOrOffer, index) => (
									
								reqOrOffer.date ? 
								(<tr key={index}>
									<td><Avatar size={40} src={reqOrOffer.user.picture}/></td>
									<td>{`${reqOrOffer.user.name} needs help "${reqOrOffer.title}"`} </td>
									<td></td>
									<td>{`${reqOrOffer.user.date}`}</td>
								</tr>)

								:

								(<tr key={index}>
									<td><Avatar size={40} src={reqOrOffer.offUser.picture}/></td>
									<td>{`${reqOrOffer.offUser.name} helped ${reqOrOffer.reqUser.name}`}</td>
									<td><Avatar size={40} src={reqOrOffer.reqUser.picture}/></td>
									<td>{`${reqOrOffer.offUser.date}`}</td>
								</tr>)
								
							))
						}
					</tbody>
     				</Table>
     				</div>
     			</div>
		)
	}
})
