import {database} from '../firebase';

let initialState = {
  markers: [],
  center: {},
  selectedMarker: {}
}

const GET_ALL_MARKERS = 'GET_ALL_MARKERS'
const SET_LOCATION = 'SET_LOCATION'
const SET_SELECTED_MARKER = 'SET_SELECTED_MARKER'
const UPDATE_MARKERS = 'UPDATE_MARKERS'

const reducer = (state = initialState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {

    case GET_ALL_MARKERS:
      newState.markers = action.markers
      break

    case SET_SELECTED_MARKER:
      newState.selectedMarker = action.selectedMarker
      break

    case UPDATE_MARKERS:
      newState.markers = action.markers
      break

    case SET_LOCATION:
      newState.center = action.center
      break;

    default: return state
  }

  return newState
}

export const getMarkers = (markers) => ({
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

export const updateMarkers = (markers) => ({
  type: UPDATE_MARKERS,
  markers
})

//action-creators
export const grabUserLocation = () => dispatch => {
  navigator.geolocation.watchPosition(Position => {
       let center = {
         latitude: parseFloat(Position.coords.latitude),
         longitude: parseFloat(Position.coords.longitude)
       }
    dispatch(setLocation(center))
   })
}

const findRequester = (request) => {
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
    return newReqObj
  })
}

export const getAllMarkers = () => dispatch =>
  database.ref('Requests')
  .on('value', snapshot => {
    let requestObjects = snapshot.val()
    let markers = [];

    if (Object.keys(requestObjects)) {
      Object.keys(requestObjects).forEach(key => {
        if (requestObjects[key].location && (requestObjects[key].status !== 'closed')) {
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
    dispatch(getMarkers(markerArr))
  })
})

  export const getNetworkMarkers = (currentUserId) => dispatch =>
  database.ref('Requests')
  .on('value', snapshot => {
    let requestObjects = snapshot.val()
    let markers = []
    if (Object.keys(requestObjects)) {
      Object.keys(requestObjects).forEach(key => {
        if (requestObjects[key].location && (requestObjects[key].status !== 'closed')) {
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
      database.ref('Users').child(currentUserId)
      .once('value')
      .then(snapshot => {
        let userNetwork = snapshot.child("network").val()
        if(userNetwork){
          let networkArray = Object.keys(userNetwork)
          let networkIds = networkArray.map(networkId => {
            return userNetwork[networkId].uid
          })
          let filteredMarkers = markerArr.filter(marker => {
           if (networkIds.indexOf(marker.uid) > -1) return marker
         })
          return filteredMarkers
        } else {
          return null
        }
      })
      .then(filteredMarkerArray => {
        dispatch(getMarkers(filteredMarkerArray))
      })
    })
  })
  
export default reducer
