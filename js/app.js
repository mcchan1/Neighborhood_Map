
var self = this;
var map, NewYorkCity, infowindow;

function initMap() {
	NewYorkCity = new google.maps.LatLng(40.7642846,-73.9818741);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: NewYorkCity,
    zoom: 16
  });
};

// Here's my data model
var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
 
    this.fullName = ko.pureComputed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);
};
 
ko.applyBindings(new ViewModel("Planet", "Earth")); 