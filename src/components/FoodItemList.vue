<template>
  <div class="food-item-list">
    <sort-buttons
      v-on:sort-event="handleSortEvent"
      v-on:search-event="handleSearchEvent"
    />
    <pulse-loader v-if="isLoading"></pulse-loader>
    <div
      v-else-if="!anyFoodItemsToDisplay"
      class="fooditem-empty-list"
    >
      <figure id="undraw-hamburger-figure" class="image">
        <img id="undraw-hamburger-img" alt="undraw-hamburger" src="@/assets/undraw_hamburger.svg">
      </figure>
      <span class="subtitle is-size-6-mobile">No more lunch offers for today. Check again tomorrow!</span>
    </div>
    <div
      v-else
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
import PulseLoader from 'vue-spinner/src/PulseLoader'

import SortMethods from '../mixins/SortMethods'

export default {
  name: 'FoodItemList',
  components: { SortButtons, PulseLoader, FoodItem },
  mixins: [SortMethods],
  data () {
    return {
      sortKey: null,
      sortDirection: null,
      searchText: ''
    }
  },
  props: {
    foodItems: Array,
    isLoading: Boolean
  },
  computed: {
    anyFoodItemsToDisplay () {
      return this.foodItems.length > 0
    }
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
  .v-spinner {
    margin-top: 20vh;
    text-align: center;
  }

  .fooditem-empty-list {
    text-align: center;
  }

  #undraw-hamburger-figure {
    margin: 2rem;
  }

  #undraw-hamburger-img {
    max-height: 20rem;
  }
</style>
