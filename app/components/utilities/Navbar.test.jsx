import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import Navbar from './Navbar'

describe('<Navbar />', () => {

  let wrapper
  beforeEach('render the Navbar wrapper', () => {
    wrapper = shallow(<Navbar />)
  })

  it('shows the Bodhi logo', () => {
    expect(wrapper.find('#navbar-brand')).to.have.length(1)
  })

})

describe("<Navbar />'s connection", () => {
  const state = {
    offersReceived:
      [{ message: "hey, I like coffee too"  },
       {message: "I found your socks"}],
    currentUser: {
      message: { msg: "Please add me to your network" }
    }
  }

  let wrapper, store, dispatch
  beforeEach('create store and render the Navbar wrapper', () => {
      store = createStore(state => state, state)
      dispatch = stub(store, 'dispatch')
      wrapper = shallow(<Navbar store={store}/>)
  })

  it('gets prop.currentUser from state', () => {
    expect(wrapper.find(Navbar)).to.have.prop('currentU')
  } )
})
