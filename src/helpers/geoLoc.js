/**
 * Returns a promise that resolves to the user's co-ordinates
 * @returns {Promise}
 */
export function geoLoc(){
    return new Promise(function(resolve, reject){
        /**
         * If we've already resolved location, just cache it. Other modules need to know current lat/lon and they
         * receive it from here
         */
        if(geoLoc.prototype.cachedLocation) {
            return resolve(geoLoc.prototype.cachedLocation);
        } else if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (data) {
                if (data) {
                    // Ca-ching
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

/**
 * Returns a list of places that are within a distance from the user's current location
 * @param places - A list of all places to filter from. A parsed version of the csv file
 * @param currentLocation - The current co-ordinates of the user
 * @param opts - An object containing options. Currently, the accuracy(distance in km) that is used to filter places
 * @returns {Array}
 */
export function filterPlaces(places, currentLocation, opts){
    return places
        .map(calculateDist.bind(null, currentLocation))
        .filter(placeFilter.bind(null, opts))
        .sort(placeSorter);
}


/**
 * Uses the Haversine formula to calculate the great arc-distance between two points.
 * Stolen from: http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns {number - Arc distance between the two points in km}
 */
export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371, // Radius of the earth in km
        dLat = lat2-lat1,
        dLon = lon2-lon1,
        a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon/2) * Math.sin(dLon/2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
        d = R * c; // Distance in km

    return d/1000;
}


/**
 * Helper functions
 */

let calculateDist = (currentLocation, place) => {
    place.dist = getDistanceFromLatLonInKm(+place.latitude, +place.longitude,
        currentLocation.latitude, currentLocation.longitude);

    return place;
};

let placeFilter = (opts, place) => {
    return place.dist <= opts.accuracy;
};

let placeSorter = (place1, place2) => {
    if(place1.dist > place2.dist) {
        return 1;
    } else {
        return -1;
    }
};
