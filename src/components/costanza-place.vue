<template>
    <li class="constanza-place" v-on:click='selectPlace'>
        {{place.name}} -- {{place.location}}
    </li>
</template>


<style>
    .constanza-place {
        cursor: pointer;
    }
</style>


<script>
    import bus from '../helpers/events.js';
    export default{
        props: ['place'],
        methods: {
            selectPlace: function() {
                bus.$emit('placeSelected', this.place);
            }
        }
    }
</script>
