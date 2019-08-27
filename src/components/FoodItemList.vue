<template>
  <div class="food-item-list">
    <sort-buttons
      v-on:sort-event="handleSortEvent"
      v-on:search-event="handleSearchEvent"
    />
    <div
      class="fooditem"
      v-for="foodItem in getSortedAndFilteredFoodItems(this.foodItems, sortKey, sortDirection, searchText)"
      :key="foodItem.id">
      <food-item
        :food-item-id="foodItem.id"
        :name-est="foodItem.nameEst"
        :name-eng="foodItem.nameEng"
        :prices="foodItem.prices"
        :provider-name="foodItem.provider.name"
        :tags="foodItem.foodItemTags"
        :rating-count="foodItem.ratingCount"
        :user-rating="foodItem.userRating"
        :comment-count="foodItem.commentCount"
        :depleted-report-count="foodItem.depletedReportCount"
        :has-user-made-depleted-report="foodItem.hasUserMadeDepletedReport"
      />
    </div>
  </div>
</template>

<script>
import FoodItem from './FoodItem/FoodItem'
import SortButtons from './SortButtons'

import SortMethods from '../mixins/SortMethods'

export default {
  name: 'FoodItemList',
  components: { SortButtons, FoodItem },
  mixins: [SortMethods],
  data () {
    return {
      sortKey: null,
      sortDirection: null,
      searchText: ''
    }
  },
  props: {
    foodItems: Array
  },
  methods: {
    handleSortEvent (sortKey, sortDirection) {
      this.sortKey = sortKey
      this.sortDirection = sortDirection
    },
    handleSearchEvent (searchText) {
      this.searchText = searchText
    }
  }
}
</script>

<style scoped>

</style>
