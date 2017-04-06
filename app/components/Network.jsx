import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

import Connections from './Connections'
import AddConnection from './AddConnection'
import Invite from './Invite'

const mapStateToProps = state => ({currentUser: state.currentUser})

const mapDispatchToProps = dispatch => ({
	sendNetworkRequestDispatch: (friendEmail, currentUser, msg, network) => {
		dispatch(sendNetworkRequest(friendEmail, currentUser, msg, network))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(
	class Network extends Component{

		constructor(){
			super()
			this.state = {
        slideIndex: 0
			}
		}

    handleChange = slideIndex => this.setState({slideIndex})

		render() {
      const styles = {
        inkBar: {
          backgroundColor: 'white'
        },
        tabContainer: {
          backgroundColor: 'none'
        }
      }

			return (
				<Grid className="gradient" fluid>
      		<div className="flex-container-feed">
            <Tabs
              onChange={this.handleChange}
              value={this.state.slideIndex}
              inkBarStyle={styles.inkBar}
              tabItemContainerStyle={styles.tabContainer}
            >
              <Tab label="Network" value={0} />
              <Tab label="Invite" value={1} />
              <Tab label="Add" value={2}  />
            </Tabs>
            <div className="flex-row">
              <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                <Connections user={this.props.currentUser || {}} />
                <Invite />
                <AddConnection />
              </SwipeableViews>
            </div>
          </div>
        </Grid>
      )
		}
	}
)
