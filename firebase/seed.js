const database = require("./database");

database.updateUserData("Susan",{ latitude: 40.1052644, longitude: -73.109087 });
database.updateUserData("Billy",{ latitude: 40.5052644, longitude: -73.509087 });
database.updateUserData("Rita",{ latitude: 41.5052644, longitude: -72.109087 });
database.updateUserData("Chris",{ latitude: 41.5052644, longitude: -73.109087 });

const updateRequestData = database.updateRequestData;

let users;
database.readDataOnce().then(users => {
	for(var user in users){
		updateRequestData(users[user].uid, "Moving", "A Couch", "Heavy Lifting");
	}
});


