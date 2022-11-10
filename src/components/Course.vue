<template>
  <div>
    <h2>
      Course Description
    </h2>
    <h3 v-if="courseDate.day">
      Course Date: {{ courseDate.day }}/{{ courseDate.month }}/{{ courseDate.year }}
    </h3>
    <Course :course="course" :detail="true" />
    <h3 class="contact" @click="contact()">
      Contact Us for details
    </h3>
  </div>
</template>

<script>
//import bus from '../socket.js'

import Course from './courses/Course.vue'

export default {
  props: [
    'detail'
  ],
  components: {
    Course
  },
  computed: {
    course() {
      return this.$store.getters.getCurrentCourse
    },
    courseDate() {
      return this.$store.getters.getCurrentCourseDate
    }
  },
  methods: {
    contact() {
      this.$store.dispatch('showModal', 'contact')
   }
  }
}
</script>
