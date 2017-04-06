import { database } from '../firebase'

let initialState = {
  markers: [],
  networkMarkers: [],
  center: {},
  selectedMarker: {}
}

const RECEIVE_MARKERS = 'RECEIVE_MARKERS'
const RECEIVE_NETWORK_MARKERS = 'RECEIVE_NETWORK_MARKERS'
const SET_LOCATION = 'SET_LOCATION'
const SET_SELECTED_MARKER = 'SET_SELECTED_MARKER'
const UPDATE_MARKERS = 'UPDATE_MARKERS'

const reducer = (state = initialState, action) => {

  const newState = {...state}

  switch (action.type) {

    case RECEIVE_MARKERS:
      newState.markers = action.markers
      break

    case RECEIVE_NETWORK_MARKERS:
      newState.networkMarkers = action.markers
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

export const receiveMarkers = (markers) => ({
  type: RECEIVE_MARKERS,
  markers
})

export const receiveNetworkMarkers = (markers) => ({
  type: RECEIVE_NETWORK_MARKERS,
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
  const locationId = navigator.geolocation.watchPosition(Position => {
    let center = {
     latitude: parseFloat(Position.coords.latitude),
     longitude: parseFloat(Position.coords.longitude)
    }
    dispatch(setLocation(center))
  })

  return () => navigator.geolocation.clearWatch(locationId)
}

export const findRequester = (request) => {
  return database
  .ref('Users')
  .child(request.uid)
  .once('value').then( (snapshot) => {
    let requester = {
      name: snapshot.val().name,
      picture: snapshot.val().picture,
      phone: snapshot.val().phone
    }
    let newReqObj = {...request}
    newReqObj.requester = requester
    return newReqObj
  })
}

export const getNetworkMarkers = (network, markers) => dispatch => {
  if (network) {
    // first extract all the network keys into an array
    const networkKeys = Object.keys(network)
    // then map over the keys, accessing and storing each network connection's id
    const networkUIDArr = networkKeys.map(key => network[key].uid)
    // finally once we've widdled down the list of markers based on whether their
    // associated user is in the currentUser's network, we can rerender the markers
    const networkMarkers = markers.filter(marker => networkUIDArr.includes(marker.uid))

    dispatch(receiveNetworkMarkers(networkMarkers))
  }
}

export const getAllMarkers = userId => dispatch => {
  let network
  // we grab the currentUser's network so we can get the networkMarkers later
  database.ref('Users')
  .child(userId)
  .once('value')
  .then(snapshot => {
    network = snapshot.val().network
  })
  .catch(err => console.error(err))

  const ref = database.ref('Requests')
  const listener = ref
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

    Promise.all(addingRequesterInfo)
    .then(markerArr => {
      dispatch(receiveMarkers(markerArr))
      return markerArr
    })
    .then(publicMarkers => dispatch(getNetworkMarkers(network, publicMarkers)))
    .catch(err => console.error(err))
  })

  return () => ref.off('value', listener)
}

export const getUserNetworkMarkers = (currentUserId) => dispatch =>
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
      dispatch(getNetworkMarkers(filteredMarkerArray))
    })
  })
})

export default reducer
