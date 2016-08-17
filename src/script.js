import CostanzaPlaces from './components/costanza-places.vue';
import CostanzaStreetView from './components/costanza-street-view.vue';
import CostanzaDirections from './components/costanza-directions.vue';
import {geoLoc, filterPlaces} from './helpers/geoLoc.js';


document.querySelector('.welcome-message').classList.remove('hide');

/**
 * The following fetches the CSV file and filters places based on current location.
 * It then, creates a new Vue instance and passes the filtered places to the components
 */
fetch('data/public_washrooms.csv')
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
                    /**
                     * Sets the filtered places as the data property on the root component.
                     * This is passed as props to the CostanzaPlaces component
                     */
                    data: function(){ return {places: filteredPlaces.slice(0, 7)}},
                    components: {
                        'costanza-places': CostanzaPlaces,
                        'costanza-street-view': CostanzaStreetView,
                        'costanza-directions': CostanzaDirections
                    }
                })
            });
    });