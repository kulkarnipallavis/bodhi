import React, { Component, PropTypes } from 'react'
import Map from './MapComponent'
import { connect } from 'react-redux'
import { receiveNetworkMarkers, receiveMarkers, setSelectedMarker } from '../reducers/map'
import { browserHistory } from 'react-router'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'

const mapStateToProps = state => ({
  selectedMarker: state.map.selectedMarker,
  publicMarkers: state.map.markers,
  networkMarkers: state.map.networkMarkers,
  center: {
    lat: parseFloat(state.map.center.latitude),
    lng: parseFloat(state.map.center.longitude)
  },
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  handleSelectMarker: marker => dispatch(setSelectedMarker(marker))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  class MapContainer extends Component {

    constructor(props) {
      super(props)
      this.state = {
        legendClick: true,
        filterMarkers: false,
        publicMarkers: [],
        networkMarkers: []
      }
    }

    componentWillReceiveProps(newProps, oldProps) {
      this.setState({
        publicMarkers: newProps.publicMarkers,
        networkMarkers: newProps.networkMarkers
      })
    }

    handleMapLoad = (map) => {
      this._mapComponent = map
      if (map) map.getZoom()
    }

    handleMarkerClick = (targetMarker) => {
      const markers = this.state.markers
        ? [...this.state.markers] : [...this.state.publicMarkers]
      markers.map(marker => {
        if (marker.key === targetMarker.key) marker.showDesc = true
        else marker.showDesc = false
        return marker
      })
      this.setState({markers})
      this.props.handleSelectMarker(targetMarker)
    }

    handleMarkerClose = (targetMarker) => {
      const markers = [...this.state.markers]
      markers.map(marker => {
        marker.showDesc = false
        return marker
      })
      this.setState({markers})
    }

    handleInfoButtonClick = () => browserHistory.push('/offerhelp')

    legendToggle = () => this.setState({legendClick: !this.state.legendClick})

    toggleMarkers = markerType => event => {
      const filterMarkers = markerType === 'network'
      const markers = [...this.state[`${markerType}Markers`]]
      this.setState({markers, filterMarkers})
    }

    render() {
      const purpleMarker = <Avatar id="legend-icon-bottom" backgroundColor="none" size={32} src="/img/purple-marker.svg"/>
      const redMarker = <Avatar id="legend-icon-top" backgroundColor="none" size={32} src="/img/red-marker.svg"/>
      const closeX = !this.state.legendClick
        ? <Avatar
            id="close-x"
            backgroundColor="none"
            size={15}
            src="img/x.svg"
            alt="minimize"
          />
        : <Avatar
            id="expand"
            backgroundColor="none"
            size={15}
            src="img/expand.svg"
            alt="expand map legend"
          />

      return (
        <div>
          <FlatButton
            label="My Network"
            onClick={this.toggleMarkers('network')}
          />
          <FlatButton
            label="Public"
            onClick={this.toggleMarkers('public')}
          />
          <div>
            {
              !this.state.legendClick
                ? <div id="map-legend">
                    <div className="flex-row-legend">
                      {redMarker}
                      <p>Submitted</p>
                      <span id="close-x-span" onClick={this.legendToggle}>{closeX}</span>
                    </div>
                    <div className="flex-row-legend">
                      {purpleMarker}
                      <p id="descender-fix">Offers Pending</p>
                    </div>
                  </div>

                : <div id="map-legend-min">
                    <div className="flex-row-legend">
                      <p id="legend-fix">Map Legend</p>
                      <span id="close-x-span" onClick={this.legendToggle}>{closeX}</span>
                    </div>
                  </div>
            }

            <Map
              containerElement={<div style={{ height: '90vh', width: '100%' }} />}
              mapElement={<div style={{ height: '100%', width: '100%' }} />}
              onMapLoad={this.handleMapLoad}
              markers={this.state.markers ? this.state.markers : this.state.publicMarkers}
              center={this.props.center}
              onMarkerClick={this.handleMarkerClick}
              onMarkerClose={this.handleMarkerClose}
              handleInfoButtonClick={this.handleInfoButtonClick}
            />
          </div>
        </div>
      )
    }
  }
)
