<template>
    <ol class="costanza-directions">
        <li v-for="direction in directions" :direction="direction">
             <span v-html="direction.instructions"></span>
             <span v-html="direction.duration"></span>
             <span v-html="direction.distance"></span>
        </li>
    </ol>
</template>


<style>
    .costanza-directions {
        display: inline-flex;
        flex-direction: column;
    }
</style>


<script>
    import bus from '../helpers/events.js';
    import {geoLoc} from '../helpers/geoLoc.js';

    export default{
        mounted() {
            this.directionsService = new google.maps.DirectionsService();
            this.currentLocation = geoLoc.prototype.cachedLocation;
            bus.$on('placeSelected', this.render);
        },
        data: function(){ return {place: 'select place', directions: []}},

        methods: {
            render(place) {
                this.place = place;
                this.directionsService.route(this.getFromConfig(), (result, status) => {
                    if(status === 'OK') {
                        this.directions = this.formatDirections(result);
                    } else {
                       new Error("something went wrong")
                    }
                });
            },
            getFromConfig() {
                return {
                    origin: new google.maps.LatLng({lat: this.currentLocation.latitude, lng: this.currentLocation.longitude}),
                    destination: new google.maps.LatLng({lat: +this.place.latitude, lng: +this.place.longitude}),
                    travelMode: google.maps.TravelMode.WALKING
                }
            },

            formatDirections(unformatted) {
                return unformatted.routes[0].legs[0].steps.map((step) => {
                            return { instructions: step.instructions, duration: step.duration.text,
                                distance: step.distance.text};
                });
            }
        }
    }
</script>
