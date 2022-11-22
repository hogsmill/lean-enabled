<template>
  <div>
    <h4>
      Comments on this course
    </h4>
    <p v-for="(comment, index) in comments()" :key="index">
      "{{ comment }}"
    </p>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  props: [
    'course'
  ],
  data() {
    return {
      editing: {}
    }
  },
  computed: {
    courseComments() {
      return this.$store.getters.getCourseComments
    }
  },
  created() {

    bus.emit('sendLoad', 'courseComment')

    bus.on('load', (data) => {
      if (data.type == 'courseComment') {
        this.$store.dispatch('updateCourseComments', data.objects)
      }
    })
  },
  methods: {
    comments() {
      const comments = this.courseComments.find((c) => {
        return c.level == this.course.level
      })
      return comments ? comments.comments : []
    }
  }
}
</script>
