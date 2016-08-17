export function geoLoc(){
    return new Promise(function(resolve, reject){

        if(geoLoc.prototype.cachedLocation) {
            return resolve(geoLoc.prototype.cachedLocation);
        } else if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (data) {
                if (data) {
                    geoLoc.prototype.cachedLocation = data.coords;
                    return resolve(data.coords);
                } else {
                    return reject(new Error("current location not found"));
                }
            }.bind(this));
        } else {
            reject(new Error("geolocation not supported"));
        }
    });
}


export function filterPlaces(places, currentLocation, opts){
    return places.map(function(place){
        place.dist = getDistanceFromLatLonInKm(+place.latitude, +place.longitude,
            currentLocation.latitude, currentLocation.longitude);
        place.active='';
        return place;
    }).filter(function(place){
        return place.dist <= opts.accuracy;
    }).sort(function(place1, place2){
        if(place1.dist > place2.dist) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = lat2-lat1;
    var dLon = lon2-lon1;
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d/1000;
}
