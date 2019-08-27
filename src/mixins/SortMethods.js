import _ from 'lodash'

let SortMethods = {
  methods: {
    getSortedAndFilteredFoodItems: function (items, key, direction, searchText) {
      if (searchText.length > 0) {
        items = items.filter(item =>
          item.nameEst.toLowerCase().includes(searchText.toLowerCase()) ||
          item.nameEng.toLowerCase().includes(searchText.toLowerCase()) ||
          item.provider.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.foodItemTags.some(tag => tag.foodTag.foodTagValue.toLowerCase().includes(searchText.toLowerCase()))
        )
      }
      switch (key) {
        case 'price':
          items = _.orderBy(items, item => item.prices[item.prices.length - 1].priceValue, direction)
          break
        case 'rating':
          items = _.orderBy(items, 'ratingCount', direction)
          break
      }
      return items
    }
  }
}

export default SortMethods
