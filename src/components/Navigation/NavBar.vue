<template>
  <nav class="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{name: 'home'}" class="navbar-item">
        <img src="../../assets/fuud_logo_color.png" width="112" height="28">
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
        @click="mobileNavShown = !mobileNavShown"
        :class="{'is-active' : mobileNavShown}"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu" :class="{'is-active' : mobileNavShown}">
      <div class="navbar-end">
        <div class="navbar-item" v-if="!loggedIn">
          <div class="buttons">
            <router-link v-if="!loggedIn" :to="{ name: 'register' }" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link v-if="!loggedIn" :to="{ name:'login' }" class="button is-light">Login</router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable" v-if="loggedIn">
          <a class="navbar-link">
            {{ userName }}
          </a>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              <router-link :to="{ name:'logout' }" class="button is-fullwidth is-danger">Logout</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      mobileNavShown: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    userName () {
      return this.$store.getters.getName
    }
  }
}
</script>
