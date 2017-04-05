var database = require("./firebase_config").database;
var firebase = require("firebase")

//let users;
//const updateRequestData = database.updateRequestData;

// const seedUsers = Promise.all([
// 	database.updateUserData("Susan",{ latitude: 40.1052644, longitude: -73.109087 }),
// 	database.updateUserData("Billy",{ latitude: 40.5052644, longitude: -73.509087 }),
// 	database.updateUserData("Rita",{ latitude: 41.5052644, longitude: -72.109087 }),
// 	database.updateUserData("Chris",{ latitude: 41.5052644, longitude: -73.109087 })
// ])
// .then(() => {
// 	return database.readDataOnce().then(users => {
// 		let idArr = [];

// 		for(var user in users){
// 			idArr.push(users[user].userKey)
// 		}

		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.719128, longitude: -74.009099 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Proofreading", "My Essay", "Editing", { latitude: 40.713419, longitude: -74.005601 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Babysitting", "My child", "Caretaking", { latitude: 40.711321, longitude: -74.009185 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Listening", "My problems", "Empathizing", { latitude: 40.705913, longitude: -74.009367 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Help", "NOW!", "I'm stuck in the sewer!", { latitude: 40.706344, longitude: -74.011846 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Uh oh", "A little mouse", "He's eating my food!", { latitude: 40.704262, longitude: -74.013927 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Help!", "Questions", "What is the nature of life?", { latitude: 40.703798, longitude: -74.008112 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Why not?", "Explanation", "Why did 'Lost' end that way?", { latitude: 40.706409, longitude: -74.015601 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "A Tissue Please", "I sneezed", "I need a tissue please", { latitude: 40.692028, longitude: -74.016008 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Sammy", "Any kind", "So hungry!", { latitude: 40.698535, longitude: -73.990517 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Pants", "Its cold", "I wore shorts, whoops!", { latitude: 40.714681, longitude: -73.985538 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Tall person", "Can't reach", "Something is so very high...", { latitude: 40.697348, longitude: -73.978994 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Helper", "Everything", "Heeeeelppp meeeee", { latitude: 40.703107, longitude: -73.996181 });
		updateRequestData("FpARwQcJdrOEV2WwWjtDZAhLrPl2", "Oops", "My hat", "I ate it accidentally..", { latitude: 40.695884, longitude: -73.997791 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.703286, longitude: -74.017038 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.705563, longitude: -74.013455 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.705788, longitude: -74.010250 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.708144, longitude: -74.012047 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.736985, longitude: -74.0301826 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.706985, longitude: -74.0401826 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.716985, longitude: -74.0001826 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.722485, longitude: -74.0071826 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.702485, longitude: -74.0080226 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.704185, longitude: -74.0080526 });
		// updateRequestData("1gUyu0QP3PMTNRilw6RmD5kyiOg1", "Moving", "A Couch", "Heavy Lifting", { latitude: 40.704195, longitude: -74.0080527 });
// 	});
// })



function updateRequestData(userKey, title, description, tag, location) {
  // A request entry.

  const time = firebase.database.ServerValue.TIMESTAMP

  var requestData = {
  	uid : userKey,
    title: title,
    description: description,
    tag : tag,
    location: location,
    status: 'open',
    date: time
  };

  // Get a key for a new request.
  var newRequestKey = database.ref().child('Requests').push().key;

  // Write the new requests data simultaneously in the requests list and the user's request list.
  var updates = {};
  updates['/Users/' + userKey + '/requests/requestId'] = newRequestKey;
  updates['/Requests/' + newRequestKey] = requestData;

  return database.ref().update(updates);
}
