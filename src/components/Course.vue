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
          <h4>
            Other Courses
          </h4>
          <div v-for="(c, ind) in courses" :key="ind">
            <div v-if="c.id != course.id" class="mini-course" :class="c.belt">
              <div class="logo" :class="c.logo" @click="courseDescription(c)" />
              <h5 @click="courseDescription(c)">
                {{ c.name }}
              </h5>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <CourseDetail :course="course" />
          <CourseComments :course="course" />
        </div>
        <div class="col-sm-3">
          <CourseModules :course="course" />
        </div>
      </div>
    </div>
    <h3 class="contact" @click="contact()">
      <span>Contact Us</span> for details
    </h3>
  </div>
</template>

<script>
import Course from './courses/Course.vue'
import CourseDetail from './courses/CourseDetail.vue'
import CourseComments from './courses/CourseComments.vue'
import CourseModules from './courses/CourseModules.vue'

export default {
  components: {
    Course,
    CourseDetail,
    CourseComments,
    CourseModules
  },
  computed: {
    course() {
      return this.$store.getters.getCurrentCourse
    },
    courseDate() {
      return this.$store.getters.getCurrentCourseDate
    },
    courses() {
      return this.$store.getters.getCourses
    },
  },
  methods: {
    contact() {
      this.$store.dispatch('showModal', 'contact')
    },
    courseDescription(course) {
      this.$store.dispatch('updateCurrentCourse', course)
      this.$store.dispatch('updateTab', 'course')
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

  .logo {
    margin: 20px auto;
    height: 50px;
    width: 50px;
    background-size: cover;
    background-repeat: no-repeat;

    &:hover {
      cursor: pointer;
    }

    &.technician {
      background-image: url("../assets/img/technician.webp");
    }

    &.practitioner {
      background-image: url("../assets/img/practitioner.webp");
    }

    &.coach {
      background-image: url("../assets/img/coach.webp");
    }

    &.leader {
      background-image: url("../assets/img/leader.webp");
    }
  }

  .mini-course {
    margin: 12px 24px;
    padding: 6px;

    .logo {
      height: 32px;
      width: 32px;
    }

    h5 {
      color: #fff;
      font-size: large;
    }

  }

}
</style>
