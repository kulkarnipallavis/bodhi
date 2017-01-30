import React from 'react'
//import {auth} from '../firebase.jsx'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({ currentUser: state.currentUser })

export default connect(mapStateToProps)((props) => {

  const user = props.currentUser

  return(
        <div>

        {
          user ?
          <div>
          Welcome!

          <br />You are signed in as {user.email}.
          </div>
          :
          <div>
          No user signed in.
          </div>
        }


        </div>
)}
)
