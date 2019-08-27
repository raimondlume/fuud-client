<template>
  <div class="logout"></div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('destroyToken').then(reponse => {
      this.$router.push({ name: 'home' })
    })
  }
}
</script>
