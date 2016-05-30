'use strict';

var fc = {
	apiKey: "AIzaSyB_6jpH_uOBr4498ax3kPDTqcm-t5nfUy0",
	authDomain: "project-3294112591412279601.firebaseapp.com",
	databaseURL: "https://project-3294112591412279601.firebaseio.com",
	storageBucket: "project-3294112591412279601.appspot.com",
};
firebase.initializeApp(fc);

var geocoder;
var typingTimer;
var doneTypingInterval = 2000;

var fromInput = document.getElementsByName("from")[0];
var signInButton = document.getElementById("sign-in");

fromInput.onkeyup = function() {
	clearTimeout(typingTimer);
	typingTimer = setTimeout(doneTyping, doneTypingInterval);
};

fromInput.onkeydown = function() {
	clearTimeout(typingTimer);
};

signInButton.onclick = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  fbauth.signInWithPopup(provider);
}

window.onload = function() {
	var fbauth = firebase.auth();
	var fbdatabase = firebase.database();
	var fbstorage = firebase.storage();
	fbauth.onAuthStateChanged(onAuthStateChanged);
}

function onAuthStateChanged(user) {
	if (user) {
		signInButton.setAttribute('hidden', 'true');
	}
	else {
		signInButton.setAttribute('hidden', 'false');
	}
}

function doneTyping () {
	geocoder.geocode({ address: input.value }, function(e) { console.log(e); });
}

function initMap() {
	geocoder = new google.maps.Geocoder();
}
