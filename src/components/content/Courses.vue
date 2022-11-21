<template>
  <div class="row slideanim courses">
    <div v-for="(course, index) in courses" :key="index" class="col-sm-3">
      <Course :course="course" />
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

import Course from '../courses/Course.vue'

export default {
  components: {
    Course
  },
  computed: {
    courses() {
      return this.$store.getters.getCourses
    }
  },
  created() {

    bus.emit('sendLoad', 'course')

    bus.on('load', (data) => {
      if (data.type == 'course') {
        this.$store.dispatch('updateCourses', data.objects)
      }
    })
  }
}
</script>

<style lang="scss">
.courses {
  background-image: url("../../assets/img/GettyImages-855597368.jpeg");
  background-size: cover;
}

@media screen and (max-width: 768px) {
}
</style>
