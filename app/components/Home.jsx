import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import KarmaStory from './KarmaStory'

class HomeFeed extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.generateFeed = this.generateFeed.bind(this)
  }

  componentDidMount() {
    const usersObj = this.props.users
    const offersArr = this.props.offers
    const requestsObj = this.props.requests

    this.generateFeed(usersObj, offersArr, requestsObj)
  }

  generateFeed(users, offers, requests) {
    // add requesters info to requests
    for (var request in requests) {
      if (requests[request].uid){
        requests[request].reqUser = users[requests[request].uid]
      }
    }

    if (offers.length) {
      // add requests to offers
      var stories = offers.map(offer => {
        offer.req = requests[offer.reqKey]
        offer.offUser = users[offer.offUid]
      })
    }

    console.log(offers) // only calls after initial load when it feels like it...so, errors >:o[
    this.setState({ feed: stories })
  }

	render() {
    const styles = {
      avatarStyle: { margin: '15px' }
    }

		return (
			<div className="flex-row-white">
        <div className="feed flex-col-white">
        { this.state.feed && this.state.feed.map((story, index) => (
            <KarmaStory key={index} styles={styles} story={story}/>
          )) }
        </div>
			</div>
		)
	}
}

HomeFeed.propTypes = {
  offers: PropTypes.array,
  users: PropTypes.object,
  requests: PropTypes.object
}

const mapStateToProps = state => ({
  offers: state.offers, users: state.users, requests: state.requests,
})

export default connect(mapStateToProps)(HomeFeed)
