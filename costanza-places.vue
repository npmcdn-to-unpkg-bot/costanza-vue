<template>
    <ul>
        <costanza-place v-for="place in places" :place="place"></costanza-place>
    </ul>
</template>


<style>

</style>


<script>
    import costanzaPlace from './costanza-place.vue';

    export default{
        props: ['places'],
        components: {
            'costanza-place': costanzaPlace
        }
    }
</script>
