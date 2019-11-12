<template>
  <div id="app">
    <nav-bar/>
    <div class="container">
      <router-view/>
    </div>
    <footer-component />
  </div>
</template>

<script>
import NavBar from './components/Navigation/NavBar'
import FooterComponent from './components/FooterComponent'

export default {
  components: {
    FooterComponent,
    NavBar
  },
  created () {
    // initialize Vuex state from localStorage if token present
    this.$store.dispatch('retrieveTokenFromLocalStorage')
  }
}
</script>

<style>
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .container {
    margin: 15vh auto auto !important;
    flex: 1;
  }

  @media (min-width: 950px) {
    .container {
      min-width: 55vw !important;
    }
  }

  @media (max-width: 1000px) {
    .container {
      margin: 15vh 0.6em auto !important;
    }
  }
</style>
