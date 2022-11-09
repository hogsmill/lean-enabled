<template>
  <div class="next-course">
    Next course:
    {{ course.day }}/{{ course.month }}/{{ course.year }}
    - level {{ course.level }}.
    <span class="contact" @click="contact()">Contact Us</span> for details
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  data() {
    return {
      course: {}
    }
  },
  created() {
    bus.emit('sendLoadNextCourse')

    bus.on('loadNextCourse', (data) => {
      this.course = data
    })
  },
  methods: {
    contact() {
      this.$store.dispatch('showModal', 'contact')
    }
  }
}
</script>


<style lang="scss">
  .next-course {
    font-size: 24px;

    .contact {
      color: #204893;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
</style>
