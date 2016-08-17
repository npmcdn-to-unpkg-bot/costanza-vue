<template>
    <div class="sv"></div>
</template>


<style>
    .sv{
        width: 100%;
        height: 500px;
    }
</style>


<script>
    import bus from '../helpers/events.js';
    export default{
        data(){
            return {place: 'select a place pls'}
        },
        mounted(){
            this.elem = document.querySelector('.sv');
            this.panorama = new google.maps.StreetViewPanorama( this.elem, {
                pov: {
                    heading: 34,
                    pitch: 10
                },
                visible: false
            });
            this.sv = new google.maps.StreetViewService();

            bus.$on('placeSelected', this.render);
        },
        methods: {
            render(place){
                this.sv.getPanorama({location: {lat: +place.latitude, lng: +place.longitude}}, function(data){
                    this.panorama.setPano(data.location.pano);
                    this.panorama.setVisible(true);
                }.bind(this));
            }
        }
    }
</script>
