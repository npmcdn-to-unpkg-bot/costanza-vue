import CostanzaPlaces from './costanza-places.vue';
import CostanzaStreetView from './costanza-street-view.vue';
import CostanzaDirections from './costanza-directions.vue';
import {geoLoc, filterPlaces} from './geoLoc.js';


document.querySelector('.welcome-message').classList.remove('hide');

fetch('public_washrooms.csv')
    .then(parsed => parsed.text())
    .then(data => {
        let places = d3.csvParse(data),
            filteredPlaces;
        geoLoc()
            .then(function(currentLoc){
                filteredPlaces =  filterPlaces(places, currentLoc, {accuracy: 0.9});
                document.querySelector('.welcome-message').classList.add('hide');
                new Vue({
                    el: '#app',
                    data: function(){ return {places: filteredPlaces.slice(0, 5)}},
                    components: {
                        'costanza-places': CostanzaPlaces,
                        'costanza-street-view': CostanzaStreetView,
                        'costanza-directions': CostanzaDirections
                    }
                })
            });
    });