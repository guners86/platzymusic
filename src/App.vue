<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Platzi Music</h1>
    <select v-model="selectedCountry">
      <option :value="country.value" v-for="country in countries" :key="country.value">
        {{country.name}}
      </option>
    </select>
    <spinner v-show="isLoading"></spinner>
    <ul>
      <artist v-for="artist in artists" :artist="artist" :key="artist.mbid">
      </artist>
    </ul>
  </div>
</template>

<script>

import getArtists from "./api/index.js";
import Artist from "./components/Artist"
import Spinner from "./components/Spinner"

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries:[
        { name:'Argentina', value: 'argentina'},
        { name:'Colombia', value: 'colombia'},
        { name:'España', value: 'spain'}
      ],
      selectedCountry: 'argentina',
      isLoading: false
    }
  },
  components: {
    Artist,
    Spinner
  },
  mounted: function() {
    this.refreshArtist();
  },
  watch: {
    selectedCountry: function() {
      this.refreshArtist();
    }
  },
  methods: {
    refreshArtist: function() {

      const SELF = this;
      SELF.isLoading = true;
      SELF.artists = [];

      getArtists(this.selectedCountry)
        .then(function (artist) {
          SELF.isLoading = false;
          SELF.artists = artist;
        });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
