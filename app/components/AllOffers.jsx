import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import smsLink from 'sms-link'
import { respondToOffer } from '../reducers/offer-help'
import { findRequestByKey, updateRequestStatus } from '../reducers/request-actions'



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
    //check if request is closed
    let reqStatus = this.props.findRequestByKey(offer.reqKey).status
    if (reqStatus !== 'closed') {

      let offersReceived = this.props.offersReceived
      let count = 0
      for (let x= 0; x < offersReceived.length; x++) {
        if (offersReceived[x].reqKey === offer.reqKey && offersReceived[x].offKey !== offer.offKey) {
          //if there are other offers for the same request that are not the offer just deleted, status stays pending
          count++
        }
      }

      if (!count) this.props.updateRequestStatus('open', offer.reqKey)
    }
  }



  render() {
    let offers = this.props.offersReceived

    const styles = { color: "white" }
    const allOffers = offers ? offers : []

    return (
      <div className="gradient flex-container">
        <div className="flex-row">
          <h1>Pending Help Offers</h1>
        </div>
        <div className="flex-row">
          <Table responsive={true} bordered={true} style={styles}>
            <tbody>
             { allOffers && allOffers.map((offer, index) => {

                return (
                 <tr key={index}>
                   <td><Avatar size={48} src={offer.offUser.picture}/></td>
                   <td>{offer.offUser.name}</td>
                   <td>{offer.message}</td>
                   <td>
                     <RaisedButton
                     label="Accept"
                     primary={false}
                     style={{ margin: 12 }}
                     labelColor="#533BD7"
                     backgroundColor="white"
                     onClick={this.handleRespond('accepted', offer)}/>
                   </td>
                   <td>
                     <RaisedButton
                     label="Decline"
                     secondary={false}
                     style={{ margin: 12 }}
                     labelColor="#533BD7"
                     backgroundColor="white"
                     onClick={this.handleRespond('declined', offer)}/>
                    </td>
                  </tr>
                )
              })  }
           </tbody>
         </Table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ offersReceived: state.offersReceived })
const mapDispatchToProps = dispatch => ({
  respond: (status, offerKey) => dispatch(respondToOffer(status, offerKey)),
  updateRequestStatus: (status, markerKey) => dispatch(updateRequestStatus(status, markerKey)),
  findRequestByKey: (reqKey) => dispatch(findRequestByKey(reqKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOffers)
