import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import smsLink from 'sms-link'
import { respondToOffer } from '../reducers/offer-help'
import { findRequestByKey, updateRequestStatus } from '../reducers/request-actions'
import { Grid, Row, Col } from 'react-bootstrap'
import Divider from 'material-ui/Divider'
import Done from 'material-ui/svg-icons/action/done'
import Clear from 'material-ui/svg-icons/content/clear'
import IconButton from 'material-ui/IconButton'


class AllOffers extends Component {

  constructor(props) {
    super(props)

    this.declineAndCheck = this.declineAndCheck.bind(this)
  }

  handleRespond = (newOfferStatus, offer) => (event) => {
    event.preventDefault()

    const textBody = newOfferStatus === 'declined' ?
    'I have already accepted another neighbor\'s help, but thank you for offering!'
    :
    'Thank you, I accept your help.'

    window.location = smsLink({
      phone:`${offer.offUser.phone}`,
      body: textBody
    })

    this.props.respond(newOfferStatus, offer.offKey)

    if (newOfferStatus === 'accepted') {
      this.props.updateRequestStatus('closed', offer.reqKey)
    } else {  //if declined
        this.declineAndCheck(offer)
    }
  }

  declineAndCheck(offer) {
    let reqKey = offer.reqKey
    //check if request is closed
    this.props.findRequestByKey(reqKey)
    .then( (req) => {
      if (req.status !== 'closed') {
        //if not closed (if an offer for this request has not been previously accepted), check offersReceived for other offers for the same request
        let offersReceived = this.props.offersReceived
        let count = 0
        for (let x= 0; x < offersReceived.length; x++) {
          if (offersReceived[x].reqKey === offer.reqKey && offersReceived[x].offKey !== offer.offKey) {
            //if there is another offer for the same request (that is not the offer just deleted), status stays pending
            count++
          }
        }
        //if no other pending offer are found for the request, change status of request to open
        if (!count) this.props.updateRequestStatus('open', offer.reqKey)
      }
    })
  }



  render() {
    const offers = this.props.offersReceived
    const allOffers = offers ? offers : []
    const msgs = this.props.currentUser ? this.props.currentUser.msg : null

    const notifications = this.props.currentUser ?
      [...allOffers, ...Object.values(msgs)].sort((a, b) => {
        return b.date - a.date
      })
      : null
    console.log('notifications ', notifications)

    const styles = { color: "white" }

    return (
      <Grid className="gradient" fluid>
        <div className="flex-container-feed">
          <Row className="flex-row">
            <h1 className="feed-header">Notifications</h1>
          </Row>
            <Divider/>
             { notifications && notifications.map((notification, index) => {

                return (
                <div key={index}>
                    <Row className="feed-story">
                      {
                      notification.offUser ?
                      <div>
                        <Col xs={1} sm={1} md={1} lg={1}>
                            <Avatar size={30} src={notification.offUser.picture}/>
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3}>
                          <p className="p-color-white">{notification.offUser.name.split(' ')[0]}</p>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                          <p className="p-color-white">{notification.message}</p>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                          <IconButton tooltip="Accept"
                            iconStyle={{color: "#533BD7", background: 'white'}}
                            onClick={this.handleRespond('accepted', notification)}>
                              <Done />
                          </IconButton>
                          <IconButton tooltip="Decline"
                            iconStyle={{color: "#533BD7", background: 'white'}}
                            onClick={this.handleRespond('declined', notification)}>
                            <Clear />
                          </IconButton>
                        </Col>
                      </div>

                    : <div>
                        <Col xs={1} sm={1} md={1} lg={1}>
                            <Avatar size={30} src={notification.senderPic}/>
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3}>
                          <p className="p-color-white">{notification.senderName.split(' ')[0]}</p>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                          <p className="p-color-white">{notification.msg}</p>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                          <IconButton tooltip="Accept"
                            iconStyle={{color: "#533BD7", background: 'white'}}
                            >
                              <Done />
                          </IconButton>
                          <IconButton tooltip="Decline"
                            iconStyle={{color: "#533BD7", background: 'white'}}
                            >
                            <Clear />
                          </IconButton>
                        </Col>
                      </div>
                      }

                      </Row>
                      <Divider/>
                  </div>
                )
              })  }
           </div>
        </Grid>
    )
  }
}

const mapStateToProps = state => ({
  offersReceived: state.offersReceived,
  currentUser: state.currentUser
})
const mapDispatchToProps = dispatch => ({
  respond: (status, offerKey) => dispatch(respondToOffer(status, offerKey)),
  updateRequestStatus: (status, markerKey) => dispatch(updateRequestStatus(status, markerKey)),
  findRequestByKey: (reqKey) => dispatch(findRequestByKey(reqKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOffers)
