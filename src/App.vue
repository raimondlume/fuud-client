<template>
  <div id="app">
    <nav-bar/>
    <div class="section">
      <div class="container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/Navigation/NavBar'

export default {
  components: {
    NavBar
  }
}
</script>

<style>
  .container {
    margin: 10vh auto auto !important;
  }

  @media (min-width: 950px) {
    .container {
      max-width: 55vw !important;
    }
  }
</style>
