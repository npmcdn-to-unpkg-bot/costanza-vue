<template>
    <li v-on:click='directions'>{{place.name}} -- {{place.location}}</li>
</template>
<style>
    body{

    }
</style>
<script>
    export default{
        props: ['place'],
        methods: {
            directions: (event) => {
               console.log(this.place.name);
            }
        }
    }
</script>
