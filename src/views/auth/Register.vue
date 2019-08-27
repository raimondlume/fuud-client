<template>
  <div id="register">
    <h1 class="title is-size-1">Register</h1>

    <div class="field is-grouped">
      <div class="control has-icons-left">
        <input class="input is-large" type="text" placeholder="First name" v-model="firstName">
        <span class="icon is-small is-left">
              <font-awesome-icon icon="user-edit"/>
            </span>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control has-icons-left">
        <input class="input is-large" type="text" placeholder="Last name" v-model="lastName">
        <span class="icon is-small is-left">
              <font-awesome-icon icon="user-edit"/>
            </span>
      </div>
    </div>

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

    <div class="field is-grouped">
      <div class="control has-icons-left">
        <input
          class="input is-large"
          type="password"
          placeholder="Confirm password"
          v-model="passwordConfirm"
        >
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
        <button class="button is-link is-large" @click="register()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    register () {
      if (this.password !== this.passwordConfirm) {
        // TODO: proper HTML/CSS validation feedback
        alert('passwords dont match!')
        return
      }

      this.$store
        .dispatch('createToken', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        .then(response => {
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log(error)
          this.displayAlert = true
        })
    }
  }
}
</script>
