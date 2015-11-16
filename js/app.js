

// var self = this;
// var map, NewYorkCity, infowindow;
var locations = [
	{	
		"title": 'Melwani & Chan LLP',
		"date": '2012 to Present',
		"lat": '40.773609', 
		"lng": '-73.989434',
		"position":'Partner',
		"description":'Legal eagle'
	},
];
function initMap() {
 
	NewYorkCity = new google.maps.LatLng(40.7642846,-73.9818741);
  	map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: NewYorkCity,
    zoom: 16
  });
  	var locations = new google.maps.Marker({
  		position: NewYorkCity,
  		title: "Qoo"
  	});
  	locations.setMap(map);
};//initMap
// Here's my data model
var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
 
    this.fullName = ko.pureComputed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);
};
 
ko.applyBindings(new ViewModel("Qoo", "Earth")); 