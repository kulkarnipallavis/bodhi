// import React from 'react'
// import chai, {expect} from 'chai'
// chai.use(require('chai-enzyme')())
// import {shallow} from 'enzyme'
// import {spy, stub} from 'sinon'
// chai.use(require('sinon-chai'))
// import {createStore} from 'redux'

// import AllOffers from './AllOffers'


// describe("<AllOffers />'s connection", () => {
//   const state = {
//     offersReceived:
//       [{ message: "hey, I like coffee too"  },
//        {message: "I found your socks"}, { thing: "third thing"}],
//     currentUser: {
//       message: 1: { msg: "Please add me to your network", network: true }, 2: { msg: "You've been added to Bear's network" }
//     }
//   }

//   let wrapper, store, dispatch
//   beforeEach('create store and render the AllOffers wrapper', () => {
//       store = createStore(state => state, state)
//       dispatch = stub(store, 'dispatch')
//       wrapper = shallow(<AllOffers store={store}/>)
//   })

//   it('gets correct number of offersReceived from state', () => {
//     expect(wrapper.props().offersReceived.length).to.equal(3)
//   } )


// })
