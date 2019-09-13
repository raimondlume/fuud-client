<template>
  <div class="button-row">
    <button
      class="button is-primary is-rounded"
      :class="{
        'is-outlined': sortKey !== 'rating'
       }"
      @click="selectSortMethod('rating')">
          <span class="icon">
            <font-awesome-icon :icon="getIconDirection('rating')" />
          </span>
      <span class="is-family-secondary">Rating</span>
    </button>
    <button
      class="button is-info is-rounded"
      :class="{
        'is-outlined': sortKey !== 'price'
       }"
      @click="selectSortMethod('price')">
          <span class="icon">
            <font-awesome-icon :icon="getIconDirection('price')" />
          </span>
      <span class="is-family-secondary">Price</span>
    </button>
    <div class="field search-input">
      <div class="control has-icons-left has-icons-right">
        <input class="input is-rounded" type="text" placeholder="vegan, gluten-free, soup..." v-model="searchText" @keyup="search">
        <span class="icon is-left">
            <font-awesome-icon icon="search" />
        </span>
        <span class="icon is-right clickable-icon" @click="clearSearchInput" v-if="searchText.length > 0">
            <font-awesome-icon icon="times" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortButtons',
  data () {
    return {
      sortKey: 'rating',
      sortDirection: 'desc',
      searchText: ''
    }
  },
  mounted () {
    this.$emit('sort-event', this.sortKey, this.sortDirection)
  },
  methods: {
    selectSortMethod (key) {
      if (this.sortKey === key) {
        this.invertSortDirection()
      } else {
        this.sortKey = key
        this.sortDirection = 'desc'
      }

      this.$emit('sort-event', this.sortKey, this.sortDirection)
    },
    search () {
      this.$emit('search-event', this.searchText)
    },
    invertSortDirection () {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
    },
    getIconDirection (key) {
      if (this.sortKey === key) {
        return this.sortDirection === 'desc' ? 'sort-amount-down' : 'sort-amount-up'
      }
      return 'sort-amount-down'
    },
    async clearSearchInput () {
      this.searchText = ''
      this.search()
    }
  }
}
</script>

<style scoped lang="scss">
  .button-row {
    display: flex;
    flex-direction: row;

    .search-input {
      margin-left: auto;
      margin-right: 0;
    }

    .clickable-icon {
      pointer-events: initial !important;
      cursor: pointer !important;
    }

    button {
      margin-right: 0.7em;
    }
  }
</style>
