<template>
    <ul class="costanza-places">
        <costanza-place v-for="place in places" :place="place"></costanza-place>
    </ul>
</template>


<style>
    .costanza-places {
        display: inline-flex;
        flex-direction: column;
    }
</style>


<script>
    import costanzaPlace from './costanza-place.vue';

    export default {
        props: ['places'],
        components: {
            'costanza-place': costanzaPlace
        }
    }
</script>
