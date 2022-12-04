<template>
  <div class="apprentices">
    <div class="container-fluid text-center">
      <UserType />
      <ApprenticesIntro :user-type="userType" />
      <Carousel :carousel="'apprentices'" />
      <ProblemSolving />
      <CoursesIntro :user-type="userType" />
      <Courses />
      <ServicesIntro :user-type="userType" />
      <Techniques v-if="userType == 'manager'" />
      <Benefits />
      <Comments :scope="'staff'" />
      <!--
      <CourseMap />
      <TrainingDescription :user-type="userType" />
      -->
    </div>
  </div>
</template>

<script>
import UserType from './UserType.vue'
import ProblemSolving from './content/ProblemSolving.vue'
import ApprenticesIntro from './content/ApprenticesIntro.vue'
import CoursesIntro from './content/CoursesIntro.vue'
import Courses from './content/Courses.vue'
import ServicesIntro from './content/ServicesIntro.vue'
import Techniques from './content/Techniques.vue'
import Benefits from './content/Benefits.vue'
import Comments from './content/Comments.vue'
import Carousel from './content/Carousel.vue'

/*
import CourseMap from './content/CourseMap.vue'

*/

export default {
  components: {
    UserType,
    ApprenticesIntro,
    ProblemSolving,
    CoursesIntro,
    Courses,
    ServicesIntro,
    Techniques,
    Benefits,
    Comments,
    Carousel
  },
  computed: {
    userType() {
      return this.$store.getters.getUserType
    }
  }
}
</script>

<style lang="scss">
</style>
