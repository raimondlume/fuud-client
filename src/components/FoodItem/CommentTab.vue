<!--suppress HtmlFormInputWithoutLabel -->
<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="comments">
          <template v-if="isLoading">
            <span>Loading comments...</span>
          </template>
          <template v-else-if="comments.length > 0" v-for="comment in comments">
            <div class="comment-wrapper" :key="comment.id">
              <div class="comment-text">
                <span><strong>{{ comment.appUser.firstName}} {{ comment.appUser.lastName }}</strong> {{ comment.commentValue }}</span>
              </div>
              <span>{{$moment.utc(comment.timestamp).local().fromNow()}}</span>
            </div>
          </template>
          <template v-else>
            <span>No comments yet.</span>
          </template>
        </div>
      </div>
      <div class="comment-input-wrapper" v-tooltip="!loggedIn ? 'You must be logged in to leave a comment' : null">
        <fieldset :disabled="!loggedIn">
          <div class="comment-input">
            <input
              class="input is-rounded" type="text" placeholder="Write a comment..."
              :class="{ 'is-danger': userComment.length > 140 }"
              @keyup.enter="newComment"
              v-model="userComment"
            >
            <button
              class="button is-primary is-rounded"
              @click="newComment"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentTab',
  data () {
    return {
      isLoading: false,
      comments: [],
      userComment: ''
    }
  },
  props: {
    foodItemId: Number
  },
  created () {
    this.getComments(true)
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    async getComments (withLoading) {
      this.isLoading = !!withLoading
      await this.$http
        .get(`comment/${this.foodItemId}`)
        .then(response => {
          this.comments = response.data
        })
        .catch(error => {
          console.log(error)
        })
      this.isLoading = false
    },
    async newComment () {
      await this.$http
        .post('comment', {
          'commentValue': this.userComment,
          'foodItemId': this.foodItemId,
          'appUserId': this.$store.getters.getUserID
        })
        .then(() => {
          // refresh comments
          this.$parent.mutableCommentCount += 1
          this.userComment = ''
          this.getComments(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~bulma/sass/utilities/_all";
  .card {
    border-radius: 0 0 1rem 1rem !important;
    margin: -1rem auto 1.5rem auto !important;
    z-index: 1 !important;
    background-color: #f8f9fa;
  }

  .comments {
    margin-top: 1rem;
  }

  .comment-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media (max-width: 900px) {
    .comment-wrapper {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
  }

  .comment-text {
    margin: 0.3em 0.5em 0.3em 0;
    width: fit-content;
    background-color: $info;
    border-radius: 1em;
    padding: 0.3em 0.7em;
    span {
      color: white;
      word-wrap: break-word;
      strong {
        color: white;
      }
    }
  }

  .comment-input {
    display: flex;
    flex-direction: row;

    .input {
      margin-right: 1em;
    }
  }
</style>
