import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow, mount} from 'enzyme'
import {spy, stub} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

//import AllOffers from '../AllOffers'
import { Navbar }from './Navbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//import getMuiTheme from 'material-ui/styles/getMuiTheme'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

//global.navigator = { userAgent: 'all' };

// describe('<Navbar />', () => {
//     const state = {
//     offersReceived:
//       [{ message: "hey, I like coffee too"  },
//        {message: "I found your socks"}],
//     currentUser: {
//       message: { msg: "Please add me to your network" }
//     }
//   }
//   let wrapper
//   beforeEach('render the Navbar wrapper', () => {
//       const muiTheme = getMuiTheme();
//       const mountWithContext = (node) => mount(node, {context: {muiTheme}});
//       wrapper = mountWithContext(
//         <Navbar store={state}/>
//     );
//       console.log("WRAPPER", wrapper)
//   })


//   it('exists', () => {

//     console.log("WRAPPER in mui", wrapper)
//     expect(wrapper).to.exist

//   })

// })

describe('Unit Test', () => {
    const state = {
    offersReceived:
      [{ message: "hey, I like coffee too"  },
       {message: "I found your socks"}],
    currentUser: {
      message: { msg: "Please add me to your network" }
    }
  }
  let shallowComponent
    beforeEach('create store and render the Navbar wrapper', () => {
      //store = createStore(state => state, state)
      //dispatch = stub(store, 'dispatch')
      shallowComponent = mount(
            <MuiThemeProvider>
                <Navbar store={state} />
            </MuiThemeProvider>
        );
  })
    it(`Should work`, () => {
        console.log('shallowComponent', shallowComponent.html())
        expect(shallowComponent.html()).to.exist
    })

      it('shows the Bodhi logo', () => {
    console.log("WRAPPER", shallowComponent.props().children.props.store.currentUser)
    expect(shallowComponent.find('span').text()).equal('Bodhi')
  })

  it('gets prop.currentUser from state', () => {
    expect(shallowComponent).to.contain(state)
  } )
});

// describe('<Navbar />', () => {

//   let wrapper
//   beforeEach('render the Navbar wrapper', () => {
//     wrapper = shallow(<Navbar />)
//   })
  


// })

// describe("<Navbar />'s connection", () => {
//   const state = {
//     offersReceived:
//       [{ message: "hey, I like coffee too"  },
//        {message: "I found your socks"}],
//     currentUser: {
//       message: { msg: "Please add me to your network" }
//     }
//   }
//   let shallowComponent

//   //let wrapper, store, dispatch
//   beforeEach('create store and render the Navbar wrapper', () => {
//       //store = createStore(state => state, state)
//       //dispatch = stub(store, 'dispatch')
//       shallowComponent = mount(
//             <MuiThemeProvider>
//                 <Navbar store={state} />
//             </MuiThemeProvider>
//         );
//   })

//   it('gets prop.currentUser from state', () => {
//     expect(shallowComponent.find(Navbar)).to.have.prop('currentUser')
//   } )
// })
