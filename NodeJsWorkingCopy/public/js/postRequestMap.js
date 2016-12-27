function initialize() {
    var geocoder = new google.maps.Geocoder();

    var myLatlng = new google.maps.LatLng(17.3840500, 78.4563600);

    var input = document.getElementById('location');

    var options = {
        componentRestrictions: { country: 'in' }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    var infowindow = new google.maps.InfoWindow();





    function geocodePosition(pos) {
        geocoder.geocode({
            latLng: pos
        }, function(responses) {
            if (responses && responses.length > 0) {
                updateMarkerAddress(responses[0].formatted_address);
            } else {
                updateMarkerAddress('Cannot determine address at this location.');
            }
        });
    }

    function updateMarkerAddress(str) {
        document.getElementById('location').value = str;
    }

    var mapProp = {
        center: myLatlng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    autocomplete.bindTo('bounds', map);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: true,
        title: "Drag me! to get the location"
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });


    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
        });
        marker.setVisible(true);

        infowindow.setContent('<div><strong>' + place.name + '</strong>' + '<br>' +
            place.formatted_address);
        infowindow.open(map, marker);
    });

    //geocodePosition(myLatlng);

    google.maps.event.addListener(marker, 'dragend', function(evt) {
        document.getElementById('current').innerHTML = '<p> Lat: ' + evt.latLng.lat() + '&nbsp;&nbsp;' + 'Lng: ' + evt.latLng.lng() + '</p>';
        geocodePosition(marker.getPosition());
    });

    google.maps.event.addListener(marker, 'dragstart', function(evt) {
        document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
    });
    map.setCenter(marker.position);
    marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
