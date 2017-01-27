import React from 'react'
import {auth} from '../firebase.jsx'

export default () => {

  const user = auth().currentUser

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
