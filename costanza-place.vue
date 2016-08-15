<template>
    <li v-on:click='directions'>
        {{place.name}} -- {{place.location}}
    </li>
</template>
<style>
    body{

    }
</style>
<script>
    import bus from './events.js';
    export default{
        props: ['place'],
        methods: {
            directions: function(event) {
                bus.$emit('placeSelected', this.place);
            }
        }
    }
</script>
