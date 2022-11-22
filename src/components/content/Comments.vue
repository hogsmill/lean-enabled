<template>
  <div class="row">
    <h3>
      Comments
    </h3>
    <div class="comments">
      <p v-if="scope == 'staff'">
        What course attendees have said about our training initiatives.
      </p>
      <p v-if="scope == 'stakeholder'">
        What senior people have been saying about our consultancy and training prograqms.
      </p>
      <div v-for="(comment, index) in comments[scope]" :key="index" class="comment">
        <p class="comment-text">
          "{{ comment.comment }}"
        </p>
        <p class="right">
          --
          <span v-for="(a, ind) in comment.author" :key="ind">
            {{ a }}<br>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  props: [
    'scope'
  ],
  computed: {
    comments() {
      return this.$store.getters.getScopedComments
    }
  },
  created() {

    bus.emit('sendLoad', 'comment')

    bus.on('load', (data) => {
      if (data.type == 'comment') {
        this.$store.dispatch('updateComments', data.objects)
      }
    })
  }
}
</script>

<style lang="scss">
.comments {
  max-width: 800px;
  margin: 0 auto;

  .comment {
    margin: 12px 60px;

    .comment-text {
      text-align: left;
      font-style: italic;
      font-weight: bold;
    }
    .right {
      text-align: right;
    }
  }
}
</style>
