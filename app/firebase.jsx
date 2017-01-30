import firebase from "firebase";

/* This file should be .gitignored. Security issues with having your api key public. */

var config = {
   apiKey: "AIzaSyBv8n5SQNo2WTWYpoZOXv7YEMPuQu9kpPQ",
   authDomain: "bodhi-7ad02.firebaseapp.com",
   databaseURL: "https://bodhi-7ad02.firebaseio.com",
   storageBucket: "bodhi-7ad02.appspot.com",
   messagingSenderId: "678478589847"
};

export default firebase.initializeApp(config);

export const database = firebase.database();

export const auth = firebase.auth;