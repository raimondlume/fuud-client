<template>
  <div>
    <div @click="$router.push('/')" class="back-button">
      <span class="icon">
        <font-awesome-icon icon="arrow-circle-left" />
      </span>
      <span>Back</span>
    </div>
    <h1 class="title">{{ provider.name }}</h1>
    <h3 class="subtitle">{{ provider.address }}</h3>
    <food-item-list
      :food-items="foodItems"
      :is-loading="isLoading"
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
      isFoodDataLoading: false,
      isProviderDataLoading: false,
      foodItems: []
    }
  },
  mounted () {
    this.getFoodItems()
    this.getProviderData()
  },
  computed: {
    anyFoodItemsToDisplay () {
      return this.foodItems.length > 0
    },
    isLoading () {
      return this.isFoodDataLoading || this.isProviderDataLoading
    }
  },
  methods: {
    async getFoodItems () {
      this.isFoodDataLoading = true
      let requestEndPoint = this.$store.getters.loggedIn
        ? `foodItem/provider/${this.providerId}/user`
        : `foodItem/provider/${this.providerId}`

      await this.$http
        .get(requestEndPoint)
        .then(response => {
          this.foodItems = response.data
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })

      this.isFoodDataLoading = false
    },
    async getProviderData () {
      this.isProviderDataLoading = true
      await this.$http
        .get(`provider/${this.providerId}`)
        .then(response => {
          this.provider = response.data
        })
        .catch(error => {
          console.log(error)
        })
      this.isProviderDataLoading = false
    }
  }
}
</script>

<style scoped>
  .back-button {
    display: flex;
    cursor: pointer;
  }
</style>
