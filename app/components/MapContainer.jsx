import React, { Component, PropTypes } from 'react'
import MapComponent from './MapComponent'
import { connect } from 'react-redux'
import { getMarkers, setSelectedMarker } from '../reducers/map'
import { browserHistory } from 'react-router'
import Avatar from 'material-ui/Avatar'
import store from '../store'


class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markers: this.props.markers
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleMarkerClose = this.handleMarkerClose.bind(this)
    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentDidMount() {
    this.props.getMarkers()
  }

  handleMapLoad(map) {
    this._mapComponent = map
    if (map) map.getZoom()
  }

  handleMarkerClick(targetMarker) {
    this.setState({
         markers: this.props.markers.map(marker => {
          if (marker === targetMarker) marker.showDesc = true
          else marker.showDesc = false
      })
    })
    store.dispatch(setSelectedMarker(targetMarker))
  }

  handleMarkerClose(targetMarker) {
   this.setState({
     markers: this.props.markers.map(marker => {
       if (marker === targetMarker) marker.showDesc = false
       return marker;
     })
   })
  }

  handleButtonClick() {
    browserHistory.push('/offerhelp');
  }

  render() {

    const purpleMarker = <Avatar id="legend-icon-top" backgroundColor="none" size={32} src="/img/purple-marker.svg"/>
    const redMarker = <Avatar id="legend-icon-bottom" backgroundColor="none" size={32} src="/img/red-marker.svg"/>

    return (
      <div>
        <div id="map-legend">
          <div className="flex-row-legend">
            {purpleMarker}
            <p>Offers Pending</p>
          </div>
          <div className="flex-row-legend">
            {redMarker}
            <p>Submitted</p>
          </div>
        </div>
        <MapComponent
          containerElement={  <div style={{ height: '90vh', width: '100%' }} />  }
          mapElement={  <div style={{ height: '100%', width: '100%' }} />  }
          onMapLoad={this.handleMapLoad}
          markers={this.props.markers}
          center={this.props.center}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
          handleButtonClick={this.handleButtonClick}/>
      </div>
    )
  }
}

MapContainer.propTypes = {
  markers: PropTypes.array,
  getMarkers: PropTypes.func,
  center: PropTypes.object
}

const mapStateToProps = (state) => ({
  markers: state.map.markers,
  center: {
    lat: parseFloat(state.map.center.latitude),
    lng: parseFloat(state.map.center.longitude)
  }
})

const mapDispatchToProps = { getMarkers, setSelectedMarker }

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
