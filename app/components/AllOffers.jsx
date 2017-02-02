import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table, TableBody,
         TableHeader, TableHeaderColumn,
         TableRow, TableRowColumn } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import { respondToOffer } from '../reducers/offers'

class AllOffers extends Component {

  constructor(props) {
    super(props)

    this.state = {
      toggleOffer: false,
      currentOffer: {}
    }
  }

  respond = (newOfferStatus, offerKey) => (event) => {
    event.preventDefault()
    respondToOffer(newOfferStatus, offerKey)
  }

  toggleDialog = offer => {
    this.setState({
      toggleOffer: true,
      currentOffer: offer
    })
  }

  render() {
    if (this.props.offers) {
      this.props.offers.map(offer => {
        if (this.props.users[offer.offUid]) offer.offUser = this.props.users[offer.offUid]
      })
    }

    return (
      <div id="offers" className="gradient-body flex-row-white">
        { this.state.toggleOffer ?
          <OfferDetail
            open={this.state.toggleOffer}
            offer={this.state.currentOffer}
            respondToOffer={this.props.respond}
            toggleDialog={this.toggleDialog}/>
          : null }
        <div className="flex-col-white">
          <Table style={{textAlign: 'center'}}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                    Responses
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover={true}
              stripedRows={true}>
              { this.props.offers && this.props.offers.map((offer, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{offer.offUser.picture}</TableRowColumn>
                    <TableRowColumn>{offer.offUser.name}</TableRowColumn>
                    <TableRowColumn>{offer.message}</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        className="form-button"
                        onClick={respond('accepted', offer.offKey)}
                        label={<i className="material-icons">thumb_up</i>}/>
                      <RaisedButton
                        className="form-button"
                        onClick={respond('declined', offer.offKey)}
                        label={<i className="material-icons">thumb_down</i>}/>
                    </TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

AllOffers.propTypes = {
  offers: PropTypes.array,
  users: PropTypes.object,
  respond: PropTypes.func
}

const mapStateToProps = (state) => ({
  offers: state.offers.filter(offer => offer.offUid === state.currentUser.uid),
  users: state.users
})

const mapDispatchToProps = dispatch => ({ respond: () => dispatch(respondToOffer())})

export default connect(mapStateToProps)(AllOffers)
