var database = require("./firebase_config").database;

const readDataOnce = () => {

return database.ref('/Users').once('value').then(function(snapshot) {
  // console.log(snapshot.val());
  return snapshot.val();
});
}

const writeUserData = (userId, name, location) => {
  database.ref('Users/' + userId).set({
    uid: userId,
    username: name,
    // email: email,
    // badges: badges,
    // helper_tags : helper_tags,
    // profile_picture : imageUrl
    location : location
  });
}



const updateUserData = (name, location) => {
  // A request entry.
  const newUserKey = database.ref().child('Users').push().key;
  console.log("newUserKey", newUserKey);

  const userData = {
    uid : newUserKey,
    username: name,
    // email: email,
    // badges: badges,
    // helper_tags : helper_tags,
    // profile_picture : imageUrl
    location : location
  };

  // Get a key for a new request.
 
  // Write the new user data in the users list.
  var updates = {};
  updates['/Users/' + newUserKey] = userData;

  return database.ref().update(updates);
}


function updateRequestData(userId, title, desc, tag) {
  // A request entry.
  var requestData = {
  	userId : userId,
    title: title,
    desc: desc,
    tag : tag
  };

  // Get a key for a new request.
  var newRequestKey = database.ref().child('Requests').push().key;

  // Write the new requests data simultaneously in the requests list and the user's request list.
  var updates = {};
  updates['/Users/' + userId + '/requests/' + newRequestKey] = requestData;
  updates['/Requests/' + newRequestKey + '/users/' + userId] = requestData;

  return firebase.database().ref().update(updates);
}

module.exports = {
  readDataOnce : readDataOnce,
  writeUserData : writeUserData,
  updateUserData : updateUserData
}


