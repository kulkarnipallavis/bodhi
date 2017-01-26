// TODO: Get rid of this, or get rid of
// app/firebase.jsx
var firebase = require("firebase");
require("firebase/auth");

// console.log(firebase);

 var config = {
    apiKey: "AIzaSyBv8n5SQNo2WTWYpoZOXv7YEMPuQu9kpPQ",
    authDomain: "bodhi-7ad02.firebaseapp.com",
    databaseURL: "https://bodhi-7ad02.firebaseio.com",
    storageBucket: "bodhi-7ad02.appspot.com",
    messagingSenderId: "678478589847"
};

firebase.initializeApp(config);
var database = firebase.database();

module.exports = {
	firebase : firebase,
	database : database
}