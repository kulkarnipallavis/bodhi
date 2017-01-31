import firebase from '../firebase.jsx';

let initialState = {
  markers: [],
  center: {},
  selectedMarker: {
            lat: 40.7052005,
            lng: -74.0091016,
            description: "NOW!",
            tag: "i want a puppy",
            title: "OMG!",
            uid: "7iiHpoNyiKRHLqEfTjP1Q7aAfNq1",
            key: "-Kbph4JKnNazcJxFo0pt"
  }
}

const GET_ALL_MARKERS = 'GET_ALL_MARKERS'
const SET_LOCATION = 'SET_LOCATION'
const GET_SELECTED_MARKER = 'GET_SELECTED_MARKER'

const reducer = (state = initialState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {

    case GET_ALL_MARKERS:
      newState.markers = action.markers
      break

    case GET_SELECTED_MARKER:
      newState.selectedMarker = action.selectedMarker
      break

    default: return state
  }

  return newState
}

export const getAllMarkers = (markers) => ({
  type: GET_ALL_MARKERS,
  markers
})

export const setLocation = (center) => ({
  type: SET_LOCATION,
  center
})

export const getSelectedMarker = (selectedMarker) => ({
  type: GET_SELECTED_MARKER,
  selectedMarker
})

//action-creators
export const getUserLocation = () =>
  dispatch =>
    firebase.database().ref('Users')
    .on('value', snapshot => {
      //testing out dispatcher
      let userLocation = {lat: 40.705175, lng: -74.009252}
      dispatch(setLocation(userLocation))
    })

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
