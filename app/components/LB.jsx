import React, { Component }from 'react'
import { connect } from 'react-redux'
import LoginEnter from './LoginEnter'
import Signup from './Signup'
import Request from './Request'
import Profile from './Profile'


const mapStateToProps = (state, ownProps) => ({
  children: ownProps.children,
  lbView: state.selectedPageLB
})

export default connect(mapStateToProps)((props) => {


console.log('props.children in LB', props.children)
console.log('React.children', React.children)

  const lbView = props.lbView
  const pageView = () => {
    switch (lbView)  {

      case 'LoginEnter':
      return <LoginEnter />

      case 'Signup':
      return <Signup />

      case 'Request':
      return <Request />

      case 'OfferHelp':
      return <OfferHelp />

      case 'AllOffers':
      return <AllOffers />

      case 'Profile':
      return <Profile />

      case 'EditableProfile':
      return <EditableProfile />

      case 'Home':
      return <Home />

      default:
      return null
    }
  }


  return(
    <div id="lightbox" className="modal" >

      <div className="modal-box">

        {
          props.children && React.cloneElement(props.children, props)
        }

        {pageView()}

      </div>

    </div>
  )

})



