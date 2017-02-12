import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import smsLink from 'sms-link'
import { respondToOffer } from '../reducers/offer-help'
import { findRequestByKey, updateRequestStatus } from '../reducers/request-actions'
import { addToNetwork, sendNetworkRequest, removeMsg } from '../reducers/auth'
import { Grid, Row, Col } from 'react-bootstrap'
import Divider from 'material-ui/Divider'
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


export class AllOffers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      popup: false
    }

    this.declineAndCheck = this.declineAndCheck.bind(this)
    this.popupClose = this.popupClose.bind(this)
  }


  handleRespondOffer = (newOfferStatus, offer) => (event) => {
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

  handleRespondNetwork = (response, notification) => (event) => {
    event.preventDefault()
    const currentUser = this.props.currentUser

    if (response === 'accepted') {
      const self = currentUser.name ? currentUser.name : currentUser.email
      const msgBody = `You have been added to ${self}'s network!`

      Promise.all([
      this.props.sendResponseMessage(
        notification.senderEmail, currentUser, msgBody),
      this.props.addToNetwork(notification.senderEmail, currentUser),
      this.props.addToNetwork(currentUser.email, {uid: notification.senderId, name: notification.senderName, picture: notification.senderPic})])
      .then(() => {
        this.props.removeMsg(notification.msgKey, currentUser.uid)
      })

      //this.setState({ popup: true })
    } else {
     this.props.removeMsg(notification.msgKey, currentUser.uid)
    }
  }

  handleMsg= (notification) => (event) => {
    event.preventDefault()
    this.props.removeMsg(notification.msgKey, this.props.currentUser.uid)
  }

  popupClose(event) {
    event.preventDefault()
    this.setState({ popup: false })
  }


  render() {
    const offers = this.props.offersReceived
    const allOffers = offers ? offers : []
    const msgs = this.props.currentUser ? this.props.currentUser.message : null

    this.props.currentUser && msgs ?
      Object.keys(msgs).map( key => {
        msgs[key].msgKey = key
      })
    : null

    const notifications = (this.props.currentUser && msgs || this.props.currentUser && allOffers) ?
      [...allOffers, ...Object.values(msgs)].sort((a, b) => {
        return b.date - a.date
      })
      : null

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
                      notification.offUser &&
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
                          <IconButton className="offer-response" tooltip="Accept"
                            iconStyle={{color: "#533BD7", background: 'white'}}
                            onClick={this.handleRespondOffer('accepted', notification)}>
                              <Done />
                          </IconButton>
                          <IconButton className="offer-response" tooltip="Decline"
                            iconStyle={{color: "#533BD7", background: 'white'}}
                            onClick={this.handleRespondOffer('declined', notification)}>
                            <Clear />
                          </IconButton>
                        </Col>
                      </div>
                    }

                    { !notification.offUser && notification.network &&
                      <div>
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
                          <IconButton className="network-response" tooltip="Accept"
                            iconStyle={{color: "#533BD7", background: 'white'}}
                            onClick={this.handleRespondNetwork('accepted', notification)}>
                              <Done />
                          </IconButton>
                          <IconButton className="network-response" tooltip="Decline"
                            iconStyle={{color: "#533BD7", background: 'white'}}
                            onClick={this.handleRespondNetwork('declined', notification)}>
                            <Clear />
                          </IconButton>
                        </Col>
                      </div>
                      }

                      { !notification.offUser && !notification.network &&
                       <div>
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
                          <IconButton className="msg-response" tooltip="Delete"
                            iconStyle={{color: "#533BD7", background: 'white'}}
                            onClick={this.handleMsg(notification)}>
                            <Clear />
                          </IconButton>
                        </Col>
                      </div>
                    }

                      <div>
                        <Dialog
                          title="You have added a new network connection!"
                          actions={[<FlatButton
                          label="OK"
                          onTouchTap={this.popupClose} />]}
                          modal={true}
                          open={this.state.popup}/>
                      </div>

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
  findRequestByKey: (reqKey) => dispatch(findRequestByKey(reqKey)),
  addToNetwork: (userEmail, currentUserId) => dispatch(addToNetwork(userEmail, currentUserId)),
  sendResponseMessage: (friendEmail, currentUser, msg) => dispatch(sendNetworkRequest(friendEmail, currentUser, msg)),
  removeMsg: (msgKey, userId) => dispatch(removeMsg(msgKey, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOffers)
