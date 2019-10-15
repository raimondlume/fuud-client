<template>
  <div>
    <span @click="$router.go(-1)" class="back-button">Back</span>
    <h1 class="title">{{ provider.name }}</h1>
    <h3 class="subtitle">{{ provider.address }}</h3>
    <food-item-list
      :food-items="foodItems"
    />
  </div>
</template>

<script>
import FoodItemList from '../components/FoodItemList'

export default {
  name: 'MenuByProvider',
  components: { FoodItemList },
  props: {
    providerId: Number
  },
  data () {
    return {
      provider: '',
      isLoading: false,
      foodItems: []
    }
  },
  created () {
    this.getFoodItems()
    this.getProviderData()
  },
  computed: {
    anyFoodItemsToDisplay () {
      return this.foodItems.length > 0
    }
  },
  methods: {
    async getFoodItems () {
      this.isLoading = true
      let requestEndPoint = this.$store.getters.loggedIn
        ? `foodItem/provider/${this.providerId}/user`
        : `foodItem/provider/${this.providerId}`

      await this.$http
        .get(requestEndPoint)
        .then(response => {
          this.foodItems = response.data
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })
    },
    async getProviderData () {
      this.isLoading = true
      await this.$http
        .get(`provider/${this.providerId}`)
        .then(response => {
          this.provider = response.data
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
  .back-button {
    margin-bottom: 30px;
    cursor: pointer;
  }
</style>
