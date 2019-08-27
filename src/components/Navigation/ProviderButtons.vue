<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-one-third">
      <router-link :to="{ name:'provider', params: { id: 1 }}">
        <div class="provider-box gradient-blue">
          <h2 class="title is-size-6-mobile has-text-white">BitStop</h2>
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link :to="{ name:'provider', params: { id: 2 }}">
        <div class="provider-box gradient-pink">
          <h2 class="title is-size-6-mobile has-text-white">Daily IT-maja</h2>
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link :to="{ name:'provider', params: { id: 3 }}">
        <div class="provider-box gradient-green">
          <h2 class="title is-size-6-mobile has-text-white">Daily kuues korpus</h2>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProviderButtons'
}
</script>

<style scoped>
  .provider-box {
    -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
    -moz-box-shadow: rgba(0,0,0,0.3) 0 1px 3px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
    height: 150px;
    margin: 1rem auto;
    border-radius: 1em;
    padding: 1rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .provider-box {
      height: 70px;
      padding: 0.5rem;
      margin: 0.5rem 0;
    }
  }

  .gradient-blue {
    background-image: linear-gradient(270deg, #89f7fe 0%, #66a6ff 100%);
  }

  .gradient-pink {
    background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
  }

  .gradient-green {
    background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);;
  }
</style>
