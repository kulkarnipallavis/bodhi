import React from 'react'
import MapComponent from './MapComponent'
import _ from 'lodash'
import {connect} from 'react-redux'
import {getMarkers} from '../reducers/map'

const mapStateToProps = (state) => ({markers: state.map.markers})

const mapDispatchToProps = {getMarkers}


export class MapContainer extends React.Component {

  constructor(props) {
    super(props)
    // this.state = {
    //   markers: []
    // }
    this.handleMapLoad = this.handleMapLoad.bind(this)
  }

  componentDidMount() {
    this.props.getMarkers()
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }
  render() {
    console.log(this.props)
    return(
        <div style={{ height: '100%' }}>
        <MapComponent
          containerElement={  <div style={{ height: '100vh', width: 'auto '}} />  }
          mapElement={  <div style={{ height: '100vh', width: '100vw '}} />  }
          onMapLoad={this.handleMapLoad}
          markers={this.props.markers}
        />
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)

