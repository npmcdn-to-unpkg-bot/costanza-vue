import CostanzaPlaces from './costanza-places.vue';
import {geoLoc, filterPlaces} from './geoLoc.js';


fetch('public_washrooms.csv')
    .then(parsed => parsed.text())
    .then(data => {
        let places = d3.csvParse(data),
            filteredPlaces;
        geoLoc()
            .then(function(currentLoc){
                filteredPlaces =  filterPlaces(places, currentLoc, {accuracy: 0.9});
                new Vue({
                    el: '#app',
                    data: function(){ return {places: filteredPlaces}},
                    components: {
                        'costanza-places': CostanzaPlaces
                    }
                })
            });
    });