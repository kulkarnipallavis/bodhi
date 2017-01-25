var database = require("./firebase_config").database;

const readDataOnce = () => {

return database.ref('/Users').once('value').then(function(snapshot) {
  console.log(snapshot.val());
  return snapshot.val();
});
}

function writeUserData(userId, name, email, badges, helper_tags, imageUrl){
  database.ref('users/' + userId).set({
    username: name,
    email: email,
    badges: badges,
    helper_tags : helper_tags,
    profile_picture : imageUrl
  });
}



function updateUserData(userId, name, email, badges, helper_tags, imageUrl) {
  // A request entry.
  var userData = {
    username: name,
    email: email,
    badges: badges,
    helper_tags : helper_tags,
    profile_picture : imageUrl
  };

  // Get a key for a new request.
  var newUserKey = database.ref().child('users').push().key;

  // Write the new user data in the users list.
  var updates = {};
  updates['/users/' + newUserKey] = userData;

  return database.ref().update(updates);
}


function updateReequestData(userId, title, desc, tag) {
  // A request entry.
  var requestData = {
  	userId : userId,
    title: title,
    desc: desc,
    tag : tag
  };

  // Get a key for a new request.
  var newRequestKey = database.ref().child('requests').push().key;

  // Write the new requests data simultaneously in the requests list and the user's request list.
  var updates = {};
  updates['/users/user-requests/' + newRequestKey] = requestData;
  updates['/requests/' + newRequestKey + '/' + userId] = requestData;

  return firebase.database().ref().update(updates);
}

module.exports = {
  readDataOnce : readDataOnce
}


