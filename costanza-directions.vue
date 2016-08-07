<template>
    <ul>
        <costanza-direction v-for="direction in directions" :direction="direction"></costanza-direction>
    </ul>
</template>
<style>
    body{

    }
</style>
<script>
    import costanzaDirection from './costanza-direction.vue';
    export default{
        props: ['direction'],
        components: {
            'costanza-direction': costanzaDirection
        }
    }
</script>
