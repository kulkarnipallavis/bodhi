import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getOpenRequests, getAcceptedOffers} from '../reducers/home'
import {setSelectedMarker} from '../reducers/map'
import Avatar from 'material-ui/Avatar'
import { Grid, Row, Col } from 'react-bootstrap'

const style = {
	link: {
		margin: 'auto',
		padding: 20,
		textAlign: 'center',
		display: 'inline-block',
		fontSize: 25
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
		this.props.markers.map(marker => {
			if ((marker.uid === targetRequest.uid) && (marker.title === targetRequest.title)) {
				marker.showDesc = true
				this.props.setSelectedMarkerDispatch(marker)
			}
		})
	}

	render() {
	const mergedReqAndOffers = this.getOffersAndRequests()
	const isUser = (this.props.currentUser) ? true : false;
	const userName = isUser ? this.props.currentUser.name : ""
	return (
    <div className="flex-container gradient">
      <div className="flex-row-white">
        <h2>{userName ? `Welcome ${userName}!` : `Welcome Bodhi buddy!`}</h2>
      </div>
			<div className="flex-row">
        <h1>Recent Activity</h1>
      </div>
			<div className="flex-row">
					{
						mergedReqAndOffers && mergedReqAndOffers.map((reqOrOffer, index) => (

							reqOrOffer.date ?
							(<Row key={index}>
								<Col xs={2} sm={2} md={2} lg={2}><Avatar size={30} src={reqOrOffer.user.picture}/></Col>
								<Col xs={6} sm={6} md={6} lg={6}>
                  <Link onClick={() => {this.handleRequestClick(reqOrOffer)}} to='/map'>
                    {`${reqOrOffer.user.name} needs help "${reqOrOffer.title}"`}
                  </Link>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}/>
								<Col xs={2} sm={2} md={2} lg={2}>{`${reqOrOffer.user.date}`}</Col>
							</Row>)

							:

							(<Row key={index}>
								<Col xs={2} sm={2} md={2} lg={2}><Avatar size={30} src={reqOrOffer.offUser.picture}/></Col>
								<Col xs={6} sm={6} md={6} lg={6}>{`${reqOrOffer.offUser.name} helped ${reqOrOffer.reqUser.name}`}</Col>
								<Col xs={2} sm={2} md={2} lg={2}><Avatar size={30} src={reqOrOffer.reqUser.picture}/></Col>
								<Col xs={2} sm={2} md={2} lg={2}>{`${reqOrOffer.offUser.date}`}</Col>
							</Row>)
						))
					}
      </div>
    </div>
	  )
	}
})
