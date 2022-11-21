<template>
  <div class="row">
    <h3>
      Comments
    </h3>
    <div v-for="(comment, index) in comments" :key="index" class="comment">
      <p>
        "{{ comment.comment }}"
      </p>
      <p class="right">
        -- {{ comment.author }}
      </p>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    comments() {
      return this.$store.getters.getComments
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
.comment {
  margin: 12px 60px;

  .right {
    text-align: right;
  }
}
</style>
