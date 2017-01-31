import firebase from '../firebase.jsx';

let initialState = {
  markers: [],
  selectedMarker: {}
}

const GET_ALL_MARKERS = 'GET_ALL_MARKERS'
const GET_SELECTED_MARKER = 'GET_SELECTED_MARKER'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MARKERS: return {markers: action.markers, selectedMarker: state.selectedMarker}
    default: return state
  }
}

export const getAllMarkers = (markers) => ({
  type: GET_ALL_MARKERS,
  markers
})

export const getSelectedMarker = (marker) => ({
  type: GET_SELECTED_MARKER,
  selectedMarker: marker
})

//action-creators
export const getMarkers = () =>
  dispatch =>
    firebase.database().ref('Requests')
    .on('value', snapshot => {
      let requestObjects = snapshot.val()
      let markers = [];

      Object.keys(requestObjects).forEach(key => {
        if (requestObjects[key].location.latitude) {
          markers.push({position: {lat: requestObjects[key].location.latitude, lng: requestObjects[key].location.longitude}, description: requestObjects[key].desc, tag: requestObjects[key].tag, title: requestObjects[key].title})
        }
      })

      dispatch(getAllMarkers(markers))
    })

export default reducer
