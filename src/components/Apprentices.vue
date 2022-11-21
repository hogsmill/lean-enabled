<template>
  <div class="apprentices">
    <div class="container-fluid text-center">
      <UserType />
      <ApprenticesIntro :user-type="userType" />
      <CoursesIntro :user-type="userType" />
      <Courses />
      <ServicesIntro :user-type="userType" />
      <Services v-if="user-type == 'manager'" />
      <!--
      <CourseMap />
      <TrainingDescription :user-type="userType" />
      <Comments />
      -->
    </div>
  </div>
</template>

<script>
import UserType from './UserType.vue'
import ApprenticesIntro from './content/ApprenticesIntro.vue'
import CoursesIntro from './content/CoursesIntro.vue'
import Courses from './content/Courses.vue'
import ServicesIntro from './content/ServicesIntro.vue'
import Services from './content/Services.vue'
/*
import CourseMap from './content/CourseMap.vue'
import Comments from './content/Comments.vue'

*/

export default {
  components: {
    UserType,
    ApprenticesIntro,
    CoursesIntro,
    Courses,
    ServicesIntro,
    Services
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
