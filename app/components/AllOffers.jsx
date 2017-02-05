import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import smsLink from 'sms-link'
import { respondToOffer } from '../reducers/offer-help'

class AllOffers extends Component {

  respond = (newOfferStatus, offer) => (event) => {
    event.preventDefault()
    const textBody = newOfferStatus === 'declined' ?
    'I have already accepted another neighbor\'s help, but thank you for offering!'
    :
    'Thank you, I accept your help.'

    window.location = smsLink({
      phone:`${offer.offUser.phone}`,
      body: textBody
    })

    respondToOffer(newOfferStatus, offer.offKey)
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
             { allOffers && allOffers.map((offer, index) => (
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
                   onClick={this.respond('accepted', offer)}/>
                 </td>
                 <td>
                   <RaisedButton
                   label="Decline"
                   secondary={false}
                   style={{ margin: 12 }}
                   labelColor="#533BD7"
                   backgroundColor="white"
                   onClick={this.respond('declined', offer)}/>
                  </td>
                </tr>
              ))  }
           </tbody>
         </Table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ offersReceived: state.offersReceived })

export default connect(mapStateToProps)(AllOffers)
