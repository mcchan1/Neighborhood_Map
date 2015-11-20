
//GLOBAL VARIABLES
var map; 


//created jquery function to load knockout.js's ViewModel and initMap
//before google map api gave console error of no initMap function,couldn't
//not sure if there is another way to load, as I already tried putting 
//in different orders. 

$(document).ready(function(){

  initMap();
  ko.applyBindings(new ViewModel());
  
  
});

//CREATE VIEW MODEL AND 'OBSERVABLES'
function ViewModel(){
  var self = this;
  self.inputValue = ko.observable("dog park");


function loadData(){
  var $wikiElem = $('wikipedia-links');
  var inputWiki = $('#pac-input').val();

  //clear out old data before new request
  $wikiElem.text("");

  //wiki jsonp using ajax request
  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
  +inputWiki + '&format=json&callback=wikiCallback';

//set timeout method after 8000ms

  var wikiRequestTimeout = setTimeout(function(){
    $wikiElem.text('fuck your wikipedia');
  }, 8000);

  //ajax request
  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",

    //success function
    success: function(wikiResponse){
      var articleList = wikiResponse[1];

      //loop through results based on map search input & display
      for(var i=0; i<articleList.length; i++) {

        articleStr = articleList[i];
        var url = 'https://en.wikipedia.org/wiki/' + articleStr;
        $wikiElem.append('<li><a href="'+ url +'">'+ articleStr+'</a></li>'+'</br>');
      };

      //clear the timeout if wiki is successful
      clearTimeout(wikiRequestTimeout);

    }
  }); return false; 
}; //end of loadData function 
$('pac-input').submit(loadData);
}

//MAP FUNCTION 
function initMap() {
  NewYorkCity = new google.maps.LatLng(40.7642846,-73.9818741);
  var map = new google.maps.Map(document.getElementById('map'), {
    center: NewYorkCity,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
//INFO WINDOW
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.getDetails({
    placeId: 'ChIJe_T71flYwokRGGZTwkP_vL8'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
  });
  
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  
}; //END OF initMAP

// LOAD WIKI ARTICLES WITH AJAX
