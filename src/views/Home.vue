<template>
  <div class="home">
    <provider-buttons />
    <pulse-loader v-if="isLoading"></pulse-loader>
    <span class="is-size-3 subtitle" v-else-if="!anyFoodItemsToDisplay">No more lunch offers for today. Check again tomorrow!</span>
    <food-item-list
      v-else
      :food-items="foodItems"
    />
  </div>
</template>

<script>
import ProviderButtons from '../components/Navigation/ProviderButtons'
import PulseLoader from 'vue-spinner/src/PulseLoader'

import FoodItemList from '../components/FoodItemList'

export default {
  name: 'home',
  components: { FoodItemList, PulseLoader, ProviderButtons },
  data () {
    return {
      isLoading: false,
      foodItems: [],
      sortKey: null,
      sortDirection: null
    }
  },
  mounted () {
    this.getFoodItems()
  },
  computed: {
    anyFoodItemsToDisplay () {
      return this.foodItems.length > 0
    }
  },
  methods: {
    async getFoodItems () {
      this.isLoading = true
      // get foodItems with user specific data when user is logged in
      let requestEndPoint = this.$store.getters.loggedIn ? 'foodItem/user' : 'foodItem'
      await this.$http
        .get(requestEndPoint)
        .then(response => {
          this.foodItems = response.data
        })
        .catch(error => {
          console.log(error)
        })
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
  .v-spinner {
    margin-top: 20vh;
    text-align: center;
  }
</style>
