import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

export class OfferHelpMessage extends Component {

	render () {
		const request = this.props.selectedRequest
		const styles = {
			h2: {
				'color': '#533BD7',
				'margin': '10px',
				'fontSize': '1.5em',
				'lineHeight': '30px'
			},
			link: {
				'margin': '10px'
			}
		}

		return (
			<div className="gradient flex-container">
          <div className="flex-row">
            <div className="flex-col-white">
                {request.requester.name ?
	                <h2 style={styles.h2}>{`Thank you for offering help to ${request.requester.name}!`}</h2>
	                 :
	                <h2 style={styles.h2}>Thank you offering help through Bodhi.</h2>
             	}
                <h3>Here's what to expect next:</h3>
                 <ul>
                  {request.requester.name ?
                 	<li>{`Your offer message and phone number will be sent to ${request.requester.name}`}</li>
                 	:
                 	<li>Your offer message and phone number will be sent to the requester. It will either be declined or accepted.</li>
                  }
                 	<li>If accepted, you will receive a text message from the requester and can coordinate meeting from that point.
                 	If declined, you will be notified via text by the Bodhi app.</li>
                 	<li>Thank you for using Bodhi!</li>
                 </ul>
                 <Link to="/home" style={styles.link}>Go Back to Home</Link>
           </div>
          </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return ({
    selectedRequest: state.map.selectedMarker,
    currentUser: state.currentUser
  })
}

export default connect(mapStateToProps)(OfferHelpMessage)
