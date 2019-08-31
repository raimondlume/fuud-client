<template>
  <div id="app">
    <nav-bar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/Navigation/NavBar'

export default {
  components: {
    NavBar
  },
  mounted () {
    // initialize Vuex state from localStorage if token present
    this.$store.dispatch('retrieveTokenFromLocalStorage')
  }
}
</script>

<style>
  .container {
    margin: 15vh auto auto !important;
  }

  @media (min-width: 950px) {
    .container {
      max-width: 55vw !important;
    }
  }

  @media (max-width: 950px) {
    .container {
      margin: 15vh 0.6em auto !important;
    }
  }
</style>
