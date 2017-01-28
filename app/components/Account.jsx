import React from 'react'
import {auth} from '../firebase.jsx'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps)((props) => {

  const user = props.auth

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
