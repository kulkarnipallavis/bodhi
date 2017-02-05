import {database} from '../firebase';

let initialState = {
  markers: [],
  center: {},
  selectedMarker: {}
}

const GET_ALL_MARKERS = 'GET_ALL_MARKERS'
const SET_LOCATION = 'SET_LOCATION'
const SET_SELECTED_MARKER = 'SET_SELECTED_MARKER'

const reducer = (state = initialState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {

    case GET_ALL_MARKERS:
      newState.markers = action.markers
      break

    case SET_SELECTED_MARKER:
      newState.selectedMarker = action.selectedMarker
      break

    case SET_LOCATION:
      newState.center = action.center
      break;

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

export const setSelectedMarker = (selectedMarker) => ({
  type: SET_SELECTED_MARKER,
  selectedMarker
})

//action-creators
export const grabUserLocation = () => dispatch => {
  navigator.geolocation.watchPosition(Position => {
       let center = {
         lat: parseFloat(Position.coords.latitude),
         lng: parseFloat(Position.coords.longitude)
       }
       //console.log("Center from map dispatch ", center)
       console.log("WHAT ARE YOU ",  center)
       dispatch(setLocation(center))
   })
}


const findRequester = (request) => {
  //if (request.uid) {
    return database
      .ref('Users')
      .child(request.uid)
      .once('value').then( (snapshot) => {
        let requester = {
          name: snapshot.val().name,
          picture: snapshot.val().picture,
          phone: snapshot.val().phone
        }
        let newReqObj = Object.assign({}, request)
        newReqObj.requester = requester
        return  newReqObj
      })
}

export const getMarkers = () =>
  dispatch =>
    database.ref('Requests')
    .on('value', snapshot => {
      let requestObjects = snapshot.val()
      let markers = [];

      if (Object.keys(requestObjects)) {
        Object.keys(requestObjects).forEach(key => {
        if (requestObjects[key].location) {
          markers.push({
            status: requestObjects[key].status,
            position: {
              lat: requestObjects[key].location.latitude,
              lng: requestObjects[key].location.longitude
            },
            description: requestObjects[key].description,
            tag: requestObjects[key].tag,
            title: requestObjects[key].title,
            uid: requestObjects[key].uid,
            key: key
          })
        }
      })
    }

    const addingRequesterInfo = markers.map(findRequester)

    return Promise.all(addingRequesterInfo)
    .then(markerArr => {
      dispatch(getAllMarkers(markerArr))
    })
  })

export default reducer
