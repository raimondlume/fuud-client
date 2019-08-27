<template>
  <div id="login">
    <h1 class="title is-size-1">Login</h1>

    <div class="field is-grouped">
      <div class="control has-icons-left">
        <input class="input is-large" type="email" placeholder="Email" v-model="email">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="envelope"/>
        </span>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control has-icons-left">
        <input class="input is-large" type="password" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="key"/>
        </span>
      </div>
    </div>

    <!-- <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Stay logged in
        </label>
      </div>
    </div>-->

    <div class="field">
      <div class="control">
        <button class="button is-link is-large" @click="login()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      displayAlert: false
    }
  },
  methods: {
    login () {
      this.$store.dispatch('retrieveToken', {
        email: this.email,
        password: this.password
      }).then(response => {
        this.$router.push({ name: 'home' })
      }).catch(error => {
        console.log(error)
        this.displayAlert = true
      })
    }
  }
}
</script>
