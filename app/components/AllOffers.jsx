import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';





class AllOffers extends Component {
	constructor(props){
		super(props)
	}


	render(){
		console.log(this.props)

		// const offers = this.props.offersReceived.map(row) => {

		// }

		let offers = [];

		for(let offer in this.props.offersReceived){
			offers.push(offer)
		}

		offers = offers.map((offer, index) => {
			return (
				<TableRow key={index}>
					<TableRowColumn></TableRowColumn>
					<TableRowColumn></TableRowColumn>
				</TableRow>
				)
		})

		return(
			<Table>
				{offers}
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
		offersReceived: state.offersReceived
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(AllOffers)