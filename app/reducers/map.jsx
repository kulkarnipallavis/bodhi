import firebase from '../firebase.jsx';

let initialState = {
  markers: [],
  center: {}
}

const GET_ALL_MARKERS = 'GET_ALL_MARKERS'
const SET_LOCATION = 'SET_LOCATION'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MARKERS: return {markers: action.markers, center: state.center}
    case SET_LOCATION: return {markers: state.markers, center: action.center}
    default: return state
  }
}

export const getAllMarkers = (markers) => ({
  type: GET_ALL_MARKERS,
  markers
})

export const setLocation = (center) => ({
  type: SET_LOCATION,
  center
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
