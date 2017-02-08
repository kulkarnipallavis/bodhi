import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { setSelectedMarker } from '../reducers/map'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
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
        if (a.dateAccepted && b.dateAccepted) {
          return b.dateAccepted - a.dateAccepted
        } else if (a.date && b.date){
          return b.date - a.date
        } else if (a.dateAccepted && b.date){
          return b.date - a.dateAccepted
        } else if (a.date && b.dateAccepted){
          return b.dateAccepted - a.date
        }

      })
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
      const userName = isUser ? this.props.currentUser.name : ''

      return (
        <Grid className="gradient" fluid>
          <div className="flex-container">
            <Row className="flex-row">
              <h2 className="feed-header">{userName ? `Welcome ${userName}!` : `Welcome Bodhi buddy!`}</h2>
            </Row>
            <Row className="flex-row">
              <h1 className="feed-header">Recent Activity</h1>
            </Row>
            <Divider/>
            { mergedReqAndOffers && mergedReqAndOffers.map((reqOrOffer, index) => (

                reqOrOffer.date ?
                ( <div>
                    <Row className="feed-story" key={index}>
                      <Col xs={1} sm={1} md={1} lg={1}>
                        <Avatar className="feed-avatar" size={30} src={reqOrOffer.user.picture}/>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <Link onClick={() => {this.handleRequestClick(reqOrOffer)}} to='/map'>
                          <p className="p-color-white">{`${reqOrOffer.user.name} needs help "${reqOrOffer.title}"`}</p>
                        </Link>
                      </Col>
                      <Col xs={2} xsOffset={1} sm={2} smOffset={1} md={2} mdOffset={1} lg={2} lgOffset={1}>
                        <p className="p-color-white">{`${reqOrOffer.user.date}`}</p>
                      </Col>
                    </Row>
                    <Divider/>
                  </div> )

                :

                ( <div>
                    <Row className="feed-story" key={index}>
                      <Col xs={1} sm={1} md={1} lg={1}>
                        <Avatar className="feed-avatar" size={30} src={reqOrOffer.offUser.picture}/>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <p className="p-color-white">
                          {`${reqOrOffer.offUser.name} helped ${reqOrOffer.reqUser.name}`}
                        </p>
                      </Col>
                      <Col xs={1} sm={1} md={1} lg={1}>
                        <Avatar className="feed-avatar" size={30} src={reqOrOffer.reqUser.picture}/>
                      </Col>
                      <Col xs={2} sm={2} md={2} lg={2}>
                        <p className="p-color-white">{`${reqOrOffer.offUser.date}`}</p>
                      </Col>
                    </Row>
                    <Divider/>
                  </div> )
                ))}
          </div>
        </Grid>
      )
    }
  }
)
