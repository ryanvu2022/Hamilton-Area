function initMap() {
    // The map, centered at Royal Botanical Garden - Ontario
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.2880, lng: -79.8722 },
        zoom: 10,
    });
    
    geocoder = new google.maps.Geocoder();
    
    infowindow = new google.maps.InfoWindow();
    
    marker_clicked = function() {
        infowindow.close();
        infowindow.setContent("<span style=\"font-size:1.2em; font-weight: bold\">" + this.NAME + "</span>" +
                                "<br><u>Address</u>: " + this.ADDRESS + ", " + this.COMMUNITY +
                                "<br><u>Phone Number</u>: " + this.PHONE);   
        infowindow.open(map, this);         
    }

    let markers = [];

    for (i = 0; i < arena.length; i++) {   
        if (arena[i].properties.COMMUNITY == "Hamilton")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/H.png";
        else if (arena[i].properties.COMMUNITY == "Stoney Creek")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/S.png";
        else if (arena[i].properties.COMMUNITY == "Flamborough")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/F.png";
        else if (arena[i].properties.COMMUNITY == "Ancaster")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/A.png";
        else if (arena[i].properties.COMMUNITY == "Dundas")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/D.png";
        else
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/G.png";

        arena_marker = new google.maps.Marker({
            position: { lat: parseFloat(arena[i].properties.LATITUDE),
                        lng: parseFloat(arena[i].properties.LONGITUDE) },
            title: arena[i].properties.NAME,
            icon: new_icon
        });
        
        arena_marker.setMap(map);                                     
        arena_marker.NAME = arena[i].properties.NAME;                 
        arena_marker.ADDRESS = arena[i].properties.ADDRESS;           
        arena_marker.PHONE = arena[i].properties.PHONE;               
        arena_marker.COMMUNITY = arena[i].properties.COMMUNITY;       
        arena_marker.addListener("click", marker_clicked);            

        markers.push(arena_marker);

        document.getElementById("hamilton").onclick = () => {
            for (i = 0; i < markers.length; i++) {
                if (markers[i].COMMUNITY == "Hamilton")
                    markers[i].setMap(map);
                else
                    markers[i].setMap(null);
            }
        };

        document.getElementById("stoney_creek").onclick = () => {
            for (i = 0; i < markers.length; i++) {
                if (markers[i].COMMUNITY == "Stoney Creek")
                    markers[i].setMap(map);
                else
                    markers[i].setMap(null);
            }
        };

        
        document.getElementById("flamborough").onclick = () => {
            for (i = 0; i < markers.length; i++) {
                if (markers[i].COMMUNITY == "Flamborough")
                    markers[i].setMap(map);
                else
                    markers[i].setMap(null);
            }
        };

        
        document.getElementById("ancaster").onclick = () => {
            for (i = 0; i < markers.length; i++) {
                if (markers[i].COMMUNITY == "Ancaster")
                    markers[i].setMap(map);
                else
                    markers[i].setMap(null);
            }
        };

        
        document.getElementById("dundas").onclick = () => {
            for (i = 0; i < markers.length; i++) {
                if (markers[i].COMMUNITY == "Dundas")
                    markers[i].setMap(map);
                else
                    markers[i].setMap(null);
            }
        };

        
        document.getElementById("glanbrook").onclick = () => {
            for (i = 0; i < markers.length; i++) {
                if (markers[i].COMMUNITY == "Glanbrook")
                    markers[i].setMap(map);
                else
                    markers[i].setMap(null);
            }
        };

        
        document.getElementById("all_arenas").onclick = () => {
            for (i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        };
    }
}

document.getElementById("geolocate").onclick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        user_location = new google.maps.Marker({    
            position: { lat: position.coords.latitude,
                        lng: position.coords.longitude},
            title: "Your location",
            icon: "http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"
        })
        user_location.setMap(map);
    });
}

document.getElementById("geocode").onclick = () => {
    let address = document.getElementById("address").value;                 

    geocoder.geocode( {'address': address }, function(results, status) {
        if (status == 'OK') {   
            document.getElementById("coords").innerHTML = "Coords: " + results[0].geometry.location.lat() + ", " + results[0].geometry.location.lng();

            const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                icon: "http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"    
            });           
        }
        else 
            alert("Geocode was not successful for the following reason: " + status);        
    });
};

