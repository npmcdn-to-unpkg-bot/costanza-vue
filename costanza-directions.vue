<template>
    <ol>
        <li v-for="direction in directions" :direction="direction">
             <span v-html="direction.instructions"></span>
             <span v-html="direction.duration"></span>
             <span v-html="direction.distance"></span>
        </li>
    </ol>
</template>


<style>
    ol{
        display: inline-flex;
        flex-direction: column;
    }
</style>


<script>
    import bus from './events.js';
    import {geoLoc} from './geoLoc.js';

    export default{
        mounted: function(){
            this.directionsService = new google.maps.DirectionsService();
            this.currentLocation = geoLoc.prototype.cachedLocation;
            bus.$on('placeSelected', this.render);
        },
        data: function(){ return {place: 'select place', directions: []}},
        methods: {
            render: function(place){
                this.place = place;

                this.directionsService.route({
                    origin: new google.maps.LatLng({lat: this.currentLocation.latitude, lng: this.currentLocation
                            .longitude}),
                    destination: new google.maps.LatLng({lat: +place.latitude, lng: +place.longitude}),
                    travelMode: google.maps.TravelMode.WALKING
                }, function(result, status){
                    if(status === 'OK') {
                        this.directions = [];
                        result.routes[0].legs[0].steps.forEach(function(step) {
                            this.directions.push({ instructions: step.instructions, duration: step.duration.text,
                                distance: step.distance.text});
                        }.bind(this));
                    } else {
                       new Error("something went wrong")
                    }
                }.bind(this));
            }
        }
    }
</script>
