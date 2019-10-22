<template>
  <div class="home">
    <provider-buttons />
    <food-item-list
      :food-items="foodItems"
      :is-loading="isLoading"
    />
  </div>
</template>

<script>
import ProviderButtons from '../components/Navigation/ProviderButtons'
import FoodItemList from '../components/FoodItemList'

export default {
  name: 'home',
  components: { FoodItemList, ProviderButtons },
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
</style>
