import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getOpenRequests, getAcceptedOffers} from '../reducers/home'
import {setSelectedMarker} from '../reducers/map'
import Avatar from 'material-ui/Avatar'
import { Table } from 'react-bootstrap'

const style = {
	link: {
		margin: 'auto',
		padding: 10,
		textAlign: 'center',
		display: 'inline-block',
		fontSize: 25
	},
	header: {
		fontSize: 30,
		color: '#533BD7',
		textAlign: 'center'
	}
}

const mapStateToProps = (state) => {
	return {
		openRequests: state.home.openRequests,
		acceptedOffers: state.home.acceptedOffers,
		currentUser: state.currentUser,
		markers: state.map.markers
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSelectedMarkerDispatch: (marker) => {
			dispatch(setSelectedMarker(marker))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(

class Home extends Component {

	constructor(props){
		super(props)
		this.getOffersAndRequests = this.getOffersAndRequests.bind(this)
		this.handleRequestClick = this.handleRequestClick.bind(this)
	}

	getOffersAndRequests(){
		const requests = this.props.openRequests
		const offers = this.props.acceptedOffers


		const mergedReqAndOffers = [...offers, ...requests]

		mergedReqAndOffers.sort(function (a, b) {
			if(a.dateAccepted && b.dateAccepted){
				return b.dateAccepted - a.dateAccepted
			} else if (a.date && b.date){
				return b.date - a.date
			} else if (a.dateAccepted && b.date){
				return b.date - a.dateAccepted
			} else if (a.date && b.dateAccepted){
				return b.dateAccepted - a.date
			}
		
		});
		return mergedReqAndOffers;
	}

	handleRequestClick(targetRequest){

		console.log("TARGET REQUEST", targetRequest, "MARKERS", this.props.markers)

		this.props.markers.map(marker => {
			if ((marker.uid === targetRequest.uid) && (marker.title === targetRequest.title)) {
				console.log("MARKER", marker)
				marker.showDesc = true
				//this.props.setSelectedMarkerDispatch(marker)
			}
		})
	}

	render() {
	const mergedReqAndOffers = this.getOffersAndRequests()
	const isUser = (this.props.currentUser) ? true : false;
	const userName = isUser ? this.props.currentUser.name : ""
	return (
		<div className="gradient flex-container">
			<h1>{userName ? `Welcome ${userName}` : `Welcome Bodhi buddy!`}</h1>
			<div style={style.header}>Recent Activity</div>
				<div className="flex-row"  className="gradient">
				<Table responsive={true} bordered={false}>
        		<tbody>
					{
						mergedReqAndOffers && mergedReqAndOffers.map((reqOrOffer, index) => (
								
							reqOrOffer.date ? 
							(<tr key={index}>
								<td><Avatar size={40} src={reqOrOffer.user.picture}/></td>
								<td><Link onClick={() => {this.handleRequestClick(reqOrOffer)}} to='/map'>{`${reqOrOffer.user.name} needs help "${reqOrOffer.title}"`} </Link></td>
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
