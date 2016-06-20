'use strict';

var geocoder;
var typingTimer;
var doneTypingInterval = 2000;
var map;
var driverMatches = [];

var fromInput = document.getElementsByName("from")[0];

fromInput.onkeyup = function() {
	clearTimeout(typingTimer);
	typingTimer = setTimeout(doneTyping, doneTypingInterval);
};

fromInput.onkeydown = function() {
	clearTimeout(typingTimer);
};

window.onload = function() {

}

function doneTyping () {
	geocoder.geocode({ address: input.value }, function(e) { console.log(e); });
}

function updateMapMarkers() {
	for (var i = 0; i < driverMatches.length; i++) {
		driverMatches[i].sourceMarker.setMap(null);
		driverMatches[i].destMarker.setMap(null);
	}

	driverMatches = [{ start_lat: 50, start_lon: 50, end_lat: 25, end_lon: 25 }];

	// TODO get data from server
	// POST /show_all_trips

	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < driverMatches.length; i++) {
		var obj = driverMatches[i];

		obj.sourceMarker = new google.maps.Marker({
			position: { lat: obj.start_lat, lng: obj.start_lon },
			map: map,
			animation: google.maps.Animation.DROP,
			title: "Source Marker"
		});
		obj.sourceInfowin = new google.maps.InfoWindow({
			content: "Source Marker Deets"
		});
		obj.sourceMarker.addListener("click", function() {
			obj.sourceInfowin.open(map, obj.sourceMarker);
		});

		obj.destMarker = new google.maps.Marker({
			position: { lat: obj.end_lat, lng: obj.end_lon },
			map: map,
			animation: google.maps.Animation.DROP,
			title: "Destination Marker"
		});
		obj.destInfowin = new google.maps.InfoWindow({
			content: "Destination Marker Deets"
		});
		obj.destMarker.addListener("click", function() {
			obj.destInfowin.open(map, obj.destMarker);
		});

		bounds.extend(obj.sourceMarker.getPosition());
		bounds.extend(obj.destMarker.getPosition());
	}
	map.fitBounds(bounds);
}

function initMap() {
	geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById("map-canvas"),
	{
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}
