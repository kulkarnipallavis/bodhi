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

  }

  render(){
    let offers = this.props.offersReceived

    const styles = {
      color: "white"
    }

    const allOffers= offers ? offers : []

      return (
         <Table className="gradient">
         <TableBody>
        { allOffers && allOffers.map((offer, index) => (
        <TableRow key={index} style={styles}>
          <TableRowColumn>{offer.offUser.picture}</TableRowColumn>
          <TableRowColumn>{offer.offUser.name}</TableRowColumn>
          <TableRowColumn>{offer.message}</TableRowColumn>
          <TableRowColumn>
              <RaisedButton 
              label="Yes, Please" 
              primary={false} 
              style={{margin:12}}
              labelColor="#533BD7"
              backgroundColor="white" 
              onClick={()=>window.location=smsLink({phone:`${offer.offUser.phone}`, body:'Thank you. I accept your help.'})}/>
              <RaisedButton 
              label="No, Thanks" 
              secondary={false} 
              style={{margin:12}} 
              labelColor="#533BD7"
              backgroundColor="white" />
          </TableRowColumn>
          </TableRow>
           ))}
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
