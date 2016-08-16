<template>
    <li v-on:click='selectPlace'>
        {{place.name}} -- {{place.location}}
    </li>
</template>


<style>

</style>


<script>
    import bus from './events.js';
    export default{
        props: ['place'],
        methods: {
            selectPlace: function(event) {
                bus.$emit('placeSelected', this.place);
            }
        }
    }
</script>
