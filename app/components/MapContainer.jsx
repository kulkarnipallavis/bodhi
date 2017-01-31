import React, { Component, PropTypes } from 'react'
import MapComponent from './MapComponent'
import { connect } from 'react-redux'
import { getMarkers } from '../reducers/map'
import {browserHistory} from 'react-router'

class MapContainer extends Component {

  constructor(props) {
    super(props)

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
      console.log('targetMarker', targetMarker)
       this.setState({
         markers: this.props.markers.map(marker => {
           if (marker === targetMarker) marker.showDesc = true
      })
    })
  }

  handleMarkerClose(targetMarker) {
   this.setState({
     markers: this.props.markers.map(marker => {
       if (marker === targetMarker) marker.showDesc = false
       return marker;
     })
   })
  }

  handleButtonClick(evt) {
    console.log('evt.target', evt.target)
    // this.props.markers.map(marker => {
    //    if (marker === targetMarker) marker.showDesc = false
    //    return marker;
    //  })
    //browserHistory.push('/offerhelp');
  }

  render() {

/* You have different styles for your applying your css. 
*/
    return (
      <MapComponent
        containerElement={  <div style={{ height: '90vh', width: '100%' }} />  }
        mapElement={  <div style={{ height: '100%', width: '100%' }} />  }
        onMapLoad={this.handleMapLoad}
        markers={this.props.markers}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
        handleButtonClick={this.handleButtonClick}
      />
    )
  }
}

MapContainer.propTypes = {
  markers: PropTypes.array,
  getMarkers: PropTypes.func
}

const mapStateToProps = (state) => ({ markers: state.map.markers })
const mapDispatchToProps = { getMarkers }

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
