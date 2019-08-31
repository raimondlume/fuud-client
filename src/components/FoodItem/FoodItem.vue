<template>
  <div class="fooditem-wrapper">
    <div class="card" :class="{ 'has-comment-tab-open': commentTabOpen }">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile">
            <div class="column is-1 rating-column is-hidden-mobile">
              <span
                class="rating-arrow icon is-size-5-mobile"
                :class="{ 'disabled': !loggedIn }"
                v-tooltip="!loggedIn ? 'You must be logged in to give ratings' : null"
                @click="editRating('INCREASE')"
              >
                <font-awesome-icon
                  icon="angle-up"
                  :class="{ 'has-text-primary': mutableUserRating === 1 }"
                />
              </span>
              <span class="is-size-5-mobile">{{ mutableRatingCount }}</span>
              <span
                class="rating-arrow icon is-size-5-mobile"
                :class="{ 'disabled': !loggedIn }"
                v-tooltip.bottom="!loggedIn ? 'You must be logged in to give ratings' : null"
                @click="editRating('DECREASE')"
              >
                <font-awesome-icon
                  icon="angle-down"
                  :class="{ 'has-text-danger': mutableUserRating === -1 }"
                />
              </span>
            </div>
            <div class="column is-6-desktop is-8-mobile">
              <p class="title is-size-5-mobile">
                {{ nameEst }}
              </p>
              <p class="subtitle is-size-6-mobile">
                {{ nameEng }}
              </p>
              <span @click="commentTabOpen = !commentTabOpen" class="comment-count">
                {{ mutableCommentCount }} comment{{mutableCommentCount === 1 ? '' : 's'}}
              </span>
            </div>
            <div class="column is-5-desktop is-4-mobile">
              <span class="is-size-3 is-size-6-mobile" v-for="price in prices" :key="price.id">
                <strong>{{price.priceValue}}€</strong> {{ price.modifierName }} <br>
              </span>
              <p class="is-size-7-mobile">
                {{ providerName }}
              </p>
            </div>
            <div class="tags are-medium is-hidden-mobile">
              <div class="tag-wrapper" v-for="tag in tags" :key="tag.id">
                 <span
                   class="tag"
                   :class="getTagColor(tag.foodTag.id)"
                 >
                {{ tag.foodTag.foodTagValue }}
              </span>
              </div>
            </div>
            <div
              class="depleted-report-button"
              :class="{
              'has-text-info': mutableHasUserMadeDepletedReport,
              'has-text-white-ter': mutableDepletedReportCount < 3 && !mutableHasUserMadeDepletedReport,
              'has-text-warning': mutableDepletedReportCount >= 3 && !mutableHasUserMadeDepletedReport
              }"
            >
              <span
                v-if="mutableDepletedReportCount > 0"
                v-tooltip="getResponsiveReportTooltip()"
              >
                {{ mutableDepletedReportCount }}
              </span>
              <span
                class="icon"
                :class="{ 'disabled': !loggedIn }"
                v-tooltip="loggedIn ? 'The item is no longer on the menu!' : 'The item is no longer on the menu! (log in to make report)'"
                @click="postDepletedReport"
              >
                <font-awesome-icon icon="exclamation-triangle"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <comment-tab
        v-if="commentTabOpen"
        :food-item-id="foodItemId"
      />
    </transition>
  </div>
</template>

<script>
import CommentTab from './CommentTab'

export default {
  name: 'FoodItem',
  components: { CommentTab },
  data () {
    return {
      commentTabOpen: false,
      mutableUserRating: this.userRating,
      mutableRatingCount: this.ratingCount,
      mutableCommentCount: this.commentCount,
      mutableDepletedReportCount: this.depletedReportCount,
      mutableHasUserMadeDepletedReport: this.hasUserMadeDepletedReport
    }
  },
  props: {
    foodItemId: Number,
    nameEst: String,
    nameEng: String,
    prices: Array,
    providerName: String,
    tags: Array,
    ratingCount: Number,
    userRating: Number,
    commentCount: Number,
    depletedReportCount: Number,
    hasUserMadeDepletedReport: Boolean
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    getTagColor: function (tagId) {
      switch (tagId) {
        case 1:
          return 'is-primary' // vegan
        case 2:
          return 'is-warning' // gluten free
        case 3:
          return 'is-info' // lactose free
        default:
          return 'is-link'
      }
    },
    getResponsiveReportTooltip () {
      return this.mutableDepletedReportCount +
        (this.mutableDepletedReportCount === 1
          ? ' person has'
          : ' people have') +
      ' reported that the offer is no longer active'
    },
    editRating: async function (action) {
      if (!this.loggedIn) return

      let ratingValue

      if (action === 'INCREASE') {
        switch (this.mutableUserRating) {
          case 1: // upvote given already, withdraw
            ratingValue = -1
            break
          case -1: // change downvote to upvote
            ratingValue = 2
            break
          default: // no vote given, give upvote
            ratingValue = 1
            break
        }
      } else {
        switch (this.mutableUserRating) {
          case -1: // downvote given already, withdraw
            ratingValue = 1
            break
          case 1: // change upvote to downvote
            ratingValue = -2
            break
          default: // no vote given, give downvote
            ratingValue = -1
            break
        }
      }

      await this.$http
        .post('rating', {
          'ratingValue': ratingValue,
          'foodItemId': this.foodItemId,
          'appUserId': this.$store.getters.getUserID
        })
        .then(response => {
          this.mutableRatingCount += ratingValue
          this.mutableUserRating += ratingValue
        })
        .catch(error => {
          console.log(error)
        })
    },
    async postDepletedReport () {
      if (this.hasUserMadeDepletedReport || !this.loggedIn) return
      await this.$http
        .post('foodItemDepletedReport', {
          'foodItemId': this.foodItemId,
          'appUserId': this.$store.getters.getUserID
        })
        .then(response => {
          this.mutableHasUserMadeDepletedReport = true
          this.mutableDepletedReportCount += 1
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .card {
    border-radius: 1rem;
    margin: 1.5rem auto;
    z-index: 2;
  }

  @media (max-width: 950px) {
    .card {
      margin: 1rem auto;
    }
  }

  .has-comment-tab-open {
    margin-bottom: 0;
  }

  .tags {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    margin: 1em;
    align-items: flex-end;
  }

  .rating-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 1.7em;
    user-select: none;
  }

  .rating-arrow {
    cursor: pointer;
  }

  .disabled {
    cursor: not-allowed;
  }

  .disabled svg {
    pointer-events: none !important;
  }

  .comment-count {
    user-select: none;
    cursor: pointer;
  }

  .depleted-report-button {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1em;
    cursor: pointer;
    user-select: none;
  }

  .depleted-report-button:hover {
    color: hsl(0, 0%, 48%) !important;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-enter
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(-30px);
    opacity: 0;
  }
</style>

<style>
  .tooltip {
    display: block !important;
    z-index: 10000;
  }

  .tooltip .tooltip-inner {
    background: black;
    opacity: 0.7;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    opacity: 0.7;
    z-index: 1;
  }

  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }

  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }

  .tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="right"] {
    margin-left: 5px;
  }

  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }

  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
</style>
