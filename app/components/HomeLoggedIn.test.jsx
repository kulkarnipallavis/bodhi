import React from 'react'
import HomeLoggedIn from './HomeLoggedIn'
import renderer from 'react-test-renderer'


it ('renders correctly', () => {
  const tree = renderer.create(
    <HomeLoggedIn></HomeLoggedIn>).toJSON()
  expect(tree).toMatchSnapshot()
})


// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(4);
// });
