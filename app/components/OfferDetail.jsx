import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

const OfferDetail = (props) => {
  const offer = props.offer
  const actions = [
    <RaisedButton
      onClick={() => props.respondToOffer('accepted', offer.offKey)}
      className="form-button"
      label="Accept Offer"/>,
    <RaisedButton
      onClick={() => props.respondToOffer('declined', offer.offKey)}
      className="form-button"
      label="Decline Offer"/>,
    <RaisedButton
      onClick={props.toggleDialog}
      className="form-button"
      label="Close"/>
  ]

  return (
    <Dialog
       title="Offer Details"
       actions={actions}
       modal={false}
       open={props.open}
       onRequestClose={props.toggleDialog}>
      <Avatar src={`${offer.offUser.picture}`} size={100}/>
      <p>{`Name: ${offer.offUser.name}`}</p>
      <p>{`Member Since: ${offer.offUser.dateJoined.slice(3, 14)}`}</p>
      { offer.offUser.badges &&  offer.offUser.badges.map(badge => (
          <Avatar src={`${badge.toLowerCase()}.svg`} size={48}/>)
        ) }
      <p>{offer.message}</p>
    </Dialog>
  )
}

OfferDetail.propTypes = {
  open: PropTypes.bool,
  offer: PropTypes.object,
  respondToOffer: PropTypes.func,
  toggleDialog: PropTypes.func
}

export default OfferDetail
