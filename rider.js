'use strict';

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
  // fbauth.signInWithPopup(provider);
}

window.onload = function() {
}

function doneTyping () {
	geocoder.geocode({ address: input.value }, function(e) { console.log(e); });
}

function initMap() {
	geocoder = new google.maps.Geocoder();
}
