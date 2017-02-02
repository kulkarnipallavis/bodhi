import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Paper from 'material-ui/Paper'
import { blueGrey500 } from 'material-ui/styles/colors'

// const mapStateToProps = (state) => {
// 	return {
// 		openRequests: state.home.openRequests,
// 		closedRequests: state.home.closedRequests,
// 		currentUser: state.currentUser
// 	}
// }
//
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getOpenRequestsDispatch: () => {
// 			dispatch(getOpenRequests())
// 		},
// 		getClosedRequestsDispatch: () => {
// 			dispatch(getClosedRequests())
// 		}
// 	}
// }

// {
//   openReqKeys && openReqKeys.map((reqKey, index) => (
//     <div key={index}>{openReq[reqKey].title} {openReq[reqKey].tag} {openReq[reqKey].description}</div>
//   ))
// }
//
//   {
//     closedReqKeys && closedReqKeys.map((reqKey, index) => (
//       <div key={index}>{closedReq[reqKey].title} {closedReq[reqKey].tag} {closedReq[reqKey].description}</div>
//      ))
//   }


	// const openReq = this.props.openRequests
	// const openReqKeys = openReq ? Object.keys(openReq) : []
  //
	// const closedReq = this.props.closedRequests
	// const closedReqKeys = closedReq ? Object.keys(closedReq) : []

// export default connect(mapStateToProps, mapDispatchToProps)(

class Home extends Component {
	render() {

		return (
			<div className="gradient-body flex-container-gradient">
        <div className="flex-row">
          <h1>Karma Feed</h1>
        </div>
        <div className="feed container-white">
          <div className="flex-row">
            <div className="flex-col">
              FEED GOES HERE!
            </div>
          </div>
        </div>
			</div>
		)
	}
}

export default Home
