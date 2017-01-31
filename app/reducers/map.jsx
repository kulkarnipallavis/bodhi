import firebase from '../firebase.jsx';

let initialState = {
  markers: [],
  selectedMarker: {}
}

const GET_ALL_MARKERS = 'GET_ALL_MARKERS'
const GET_SELECTED_MARKER = 'GET_SELECTED_MARKER'

/* 
You copied over your state by hand, use Object.assign to make 
your life easier and your code cleaner. 
*/
econst reducer = (state = initialState, action) => {
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
      console.log(requestObjects)
      Object.keys(requestObjects).forEach(key => {
        if (requestObjects[key].location.latitude) {
          markers.push({position: {
            lat: requestObjects[key].location.latitude, 
            lng: requestObjects[key].location.longitude}, 
            description: requestObjects[key].description, 
            tag: requestObjects[key].tag, 
            title: requestObjects[key].title,
            uid: requestObjects[key].uid,
            key: key
          })
        }
      })
      console.log("MARKERS", markers);
      dispatch(getAllMarkers(markers))
    })

export default reducer
