<template>
    <v-card min-width="320" min-height="320">
        <v-menu top v-model="showPlacesSuggestions">
            <template v-slot:activator="{on}">
                <v-text-field :loading="placesSuggestionsLoading" v-model="placesSearchPhrase"
                              @keypress.enter="searchPlaces" hide-details filled
                              placeholder="search place">
                    <v-icon slot="prepend-inner">mdi-crosshairs-gps</v-icon>
                    <v-icon @click="searchPlaces" slot="append">mdi-magnify</v-icon>
                    <v-icon @click="$emit('close')" slot="append-outer" left>mdi-close</v-icon>
                </v-text-field>
            </template>
            <v-list>
                <v-list-item @click="setSelectedPlace(place)" v-for="(place, i) in placesSuggestions" :key="i">
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ place.formatted_address }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
        <gmap-map
            @click="setMarkerLocation"
            ref="gmap"
            style="min-height: 400px; width: 100%"
            :center="mapLocation"
            :options="{
               zoomControl: true,
               mapTypeControl: false,
               scaleControl: false,
               streetViewControl: false,
               rotateControl: false,
               fullscreenControl: true,
               disableDefaultUi: false
             }"
            :zoom="15"
            map-type-id="terrain"
        >
            <gmap-marker :position="mapMarker"></gmap-marker>
        </gmap-map>
        <v-btn :loading="placesSuggestionsLoading" @click="confirmLocation" block x-large color="primary">Continue
        </v-btn>
    </v-card>
</template>

<script>
import Vue from 'vue'
import {Plugins} from '@capacitor/core'

const {Geolocation} = Plugins

export default Vue.extend({
    name: 'MapWithPlaces',
    props: {
        defaultLocation: {
            type: Object,
        },
    },
    data() {
        const defaultCoordinates = [5.5517811, -0.2113119]

        const mapLocation = {lat: defaultCoordinates[0], lng: defaultCoordinates[1]}
        const mapMarker = {lat: defaultCoordinates[0], lng: defaultCoordinates[1]}
        return {
            mapLocation,
            mapMarker,
            placesSearchPhrase: '',
            showPlacesSuggestions: false,
            placesSuggestionsLoading: false,
            placesSuggestions: [],
            region: 'gh',
            api: 'AIzaSyDFXKA5uSSQqeY7R9XguoyE-syoagnEeT4',
        }
    },
    methods: {
        async setLocation(lat, lng) {
            await setTimeout(async () => {
                // @ts-ignore
                await this.$refs.gmap.$mapPromise.then(map => {
                    map.panTo({lat, lng})
                })
            }, 500)
            this.mapMarker = {lat, lng}
        },

        getCurrentLocation() {
            Geolocation.getCurrentPosition()
                .then((location) => {
                    this.setLocation(location.coords.latitude, location.coords.longitude)
                })
        },

        searchPlaces() {
            this.placesSuggestionsLoading = true
            fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${this.placesSearchPhrase}&region=${this.region}&key=${this.api}`)
                .then(res => res.json())
                .then(places => {
                    this.placesSuggestions = places.results
                    this.showPlacesSuggestions = true
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    this.placesSuggestionsLoading = false
                })
        },
        setMarkerLocation(map) {
            this.setLocation(map.latLng.lat(), map.latLng.lng())
        },
        confirmLocation() {
            this.placesSuggestionsLoading = true
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.mapMarker.lat},${this.mapMarker.lng}&key=${this.api}`)
                .then(res => res.json())
                .then(res => {
                    const location = {
                        address: res.results[0].formatted_address,
                        type: 'Point',
                        coordinates: [this.mapMarker.lng, this.mapMarker.lat],
                    }
                    this.$emit('location', location)
                }).finally(() => {
                this.placesSuggestionsLoading = false
            })
        },
        setSelectedPlace(place) {
            this.setLocation(place.geometry.location.lat, place.geometry.location.lng)
        },
    },
    created(){
        console.log(this.defaultLocation)
        if (this.defaultLocation && this.defaultLocation.address && this.defaultLocation.coordinates) {
            this.placesSearchPhrase = this.defaultLocation.address
            this.setLocation(
                this.defaultLocation.coordinates[1],
                this.defaultLocation.coordinates[0],
            )

        } else
            this.getCurrentLocation()
    },
})
</script>

<style scoped>

</style>
