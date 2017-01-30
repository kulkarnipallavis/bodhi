
var database = require("./firebase_config").database;

const readDataOnce = () => {

return database.ref('/Users').once('value').then(function(snapshot) {
  return snapshot.val();
});
}

const writeUserData = (userKey, name, location) => {
  database.ref('Users/' + userKey).set({
    userKey: userKey,
    username: name,
    location : location
  });
}



const updateUserData = (name, location) => {
  // A request entry.
  const newUserKey = database.ref().child('Users').push().key;
 
  const userData = {
    userKey : newUserKey,
    username: name,
    location : location
  };

  // Write the new user data in the users list.
  var updates = {};
  updates['/Users/' + newUserKey] = userData;

  return database.ref().update(updates);
}

function updateRequestData(userKey, title, desc, tag, location) {
  // A request entry.
  var requestData = {
  	userKey : userKey,
    title: title,
    desc: desc,
    tag : tag,
    location: location
  };

  // Get a key for a new request.
  var newRequestKey = database.ref().child('Requests').push().key;

  // Write the new requests data simultaneously in the requests list and the user's request list.
  var updates = {};
  updates['/Users/' + userKey + '/requests/requestId'] = newRequestKey;
  updates['/Requests/' + newRequestKey] = requestData;

  return database.ref().update(updates);
}

module.exports = {
  readDataOnce : readDataOnce,
  writeUserData : writeUserData,
  updateUserData : updateUserData,
  updateRequestData: updateRequestData
}