import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import smsLink from 'sms-link'

class AllOffers extends Component {
  constructor(props){
    super(props)

    this.state = {
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
    };
  }

  render(){
    console.log(this.props)

    let offers = this.props.offersReceived



    offers ?

    offers = offers.map((offer, index) => {
      console.log('offer[0].offUser ', offers[0].offUser)
        console.log('OFFER in MAP', JSON.stringify(offer))
        console.log('OFFER object keys in MAP ', Object.keys(offer))
        console.log('OFFER.offUser in MAP', offer['offUser'])
        console.log("*********offer.offUser.phone", offer.offUser.phone)
        console.log("offer.message", offer.message)
      return (
        <TableRow key={index}>
          <TableRowColumn>{offer.offUser.picture}</TableRowColumn>
          <TableRowColumn>{offer.offUser.name}</TableRowColumn>
          <TableRowColumn>{offer.message}</TableRowColumn>
          <TableRowColumn>
              <RaisedButton label="Yes, Please" primary={true} style={{margin:12}} onClick={()=>window.location=smsLink({phone:`${offer.offUser.phone}`, body:`${offer.message}`})}/>
              <RaisedButton label="No, Thanks" secondary={true} style={{margin:12}} />
          </TableRowColumn>
        </TableRow>
        )
    })
    : null

    return(
      <Table style={{textAlign: 'center'}}>
        <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="4" tooltip="Responses" style={{textAlign: 'center'}}>
                Responses
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover={true}
          stripedRows={true}>
        {offers}
        </TableBody>
      </Table>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const mapStateToProps = (state) => {
  return {
    offersReceived: state.offersReceived,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AllOffers)
