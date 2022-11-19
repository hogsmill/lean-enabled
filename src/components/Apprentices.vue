<template>
  <div class="apprentices">
    <div class="container-fluid text-center">
      <UserType />

      <!--
      <TrainingIntro :user-type="userType" />
      <ServicesIntro v-if="user-type == 'manager'" />
      <Services v-if="user-type == 'manager'" />
      <CoursesIntro />
      <Courses />
      <CourseMap />
      <TrainingDescription :user-type="userType" />

      <ManagersTraining v-if="userType == 'manager'" />
      <ApprenticesTraining v-if="userType == 'apprentice'" />
      -->
    </div>
  </div>
</template>

<script>
import UserType from './UserType.vue'

/*
import ServicesIntro from './content/Services.vue'
import Services from './content/Services.vue'
import CoursesIntro from './content/CoursesIntro.vue'
import Courses from './content/Courses.vue'

import ManagersTraining from './training/ManagersTraining.vue'
import ApprenticesTraining from './training/ApprenticesTraining.vue'
*/

export default {
  components: {
    UserType,
    /*
    ServicesIntro,
    Services,
    CoursesIntro,
    Courses
    
    ManagersTraining,
    ApprenticesTraining
    */
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
