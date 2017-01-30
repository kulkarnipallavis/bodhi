const database = require("./database");

let users;
const updateRequestData = database.updateRequestData;

const seedUsers = Promise.all([
	database.updateUserData("Susan",{ latitude: 40.1052644, longitude: -73.109087 }),
	database.updateUserData("Billy",{ latitude: 40.5052644, longitude: -73.509087 }),
	database.updateUserData("Rita",{ latitude: 41.5052644, longitude: -72.109087 }),
	database.updateUserData("Chris",{ latitude: 41.5052644, longitude: -73.109087 })
])
.then(() => {
	return database.readDataOnce().then(users => {
		let idArr = [];

		for(var user in users){
			idArr.push(users[user].userKey)
		}
		
		updateRequestData(idArr[0], "Moving", "A Couch", "Heavy Lifting", { latitude: 40.1052644, longitude: -73.109087 });
		updateRequestData(idArr[1], "Proofreading", "My Essay", "Editing", { latitude: 40.3052644, longitude: -73.109087 });
		updateRequestData(idArr[2], "Babysitting", "My child", "Caretaking", { latitude: 40.1052644, longitude: -72.909087 });
		updateRequestData(idArr[3], "Listening", "My problems", "Emphatizing", { latitude: 40.5052644, longitude: -72.809087 });
	});	
})





