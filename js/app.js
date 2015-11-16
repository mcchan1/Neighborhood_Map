

// var self = this;
// var map, NewYorkCity, infowindow;
var locations = [
	{	
		"title": 'Melwani & Chan LLP',
		"date": '2012 to Present',
		"lat": '40.773609', 
		"lng": '-73.989434',
		"position":'Partner',
		"description":'Legal eagle dubbabeee fm'
	},
];
function initMap() {
 
	NewYorkCity = new google.maps.LatLng(40.7642846,-73.9818741);
  	map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: NewYorkCity,
    zoom: 16
  });
  
  	var locationsString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      'locations.description'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  	var infowindow = new google.maps.InfoWindow({
  		content: locationsString
  	});

  	var locations = new google.maps.Marker({
  		position: NewYorkCity,
  		map: map,
  		title: "Qoo"
  	});

  	locations.addListener('click',function(){
  		infowindow.open(map, locations);
  	});


  	//sets location marker
  	// locations.setMap(map);

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