<template>
  <div class="course-page">
    <h2>
      Course Description
    </h2>
    <h3 v-if="courseDate.day">
      Course Date: {{ courseDate.day }}/{{ courseDate.month }}/{{ courseDate.year }}
    </h3>
    <div class="container-fluid text-center">
      <div class="row slideanim">
        <div class="col-sm-3">
          <Course :course="course" />
        </div>
        <div class="col-sm-9">
          <CourseDetail :course="course" />
        </div>
      </div>
    </div>
    <h3 class="contact" @click="contact()">
      <span>Contact Us</span> for details
    </h3>
  </div>
</template>

<script>
//import bus from '../socket.js'

import Course from './courses/Course.vue'
import CourseDetail from './courses/CourseDetail.vue'

export default {
  components: {
    Course,
    CourseDetail
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

<style lang="scss">
.course-page {

  h3 {
    span {
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }

}
</style>
