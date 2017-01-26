import React from 'react'
import firebase from '../firebase.jsx'
import firebaseui from 'firebaseui'
import {connect} from 'react-redux'


const mapStateToProps = (state) => {}

const mapDispatchToProps = (dispatch) => {}



export default connect(mapStateToProps, mapDispatchToProps)(class GoogleSignIn extends React.Component {

constructor(props) {
  super(props)
}

ComponentWillMount() {
  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}


render () {
  return (
    <div>
    </div>
  )}

})
