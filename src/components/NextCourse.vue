<template>
  <div class="next-course" v-if="courseDate.day">
    Next course:
    {{ courseDate.day }}/{{ courseDate.month }}/{{ courseDate.year }}
    - <span class="course-description" @click="courseDescription()">{{ course.name }}</span>
    (level {{ course.level }})
    - <span class="contact" @click="contact()">Contact Us</span> for details
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  data() {
    return {
      course: {},
      courseDate: {}
    }
  },
  computed: {
    courses() {
      return this.$store.getters.getCourses
    }
  },
  created() {
    bus.emit('sendLoadNextCourse')

    bus.on('loadNextCourse', (data) => {
      this.courseDate = data
      this.course = this.courses.find((c) => {
        return c.id = data.courseId
      })
    })
  },
  methods: {
    contact() {
      this.$store.dispatch('showModal', 'contact')
    },
    courseDescription(course) {
      this.$store.dispatch('updateCurrentCourseDate', this.courseDate)
      this.$store.dispatch('updateCurrentCourse', this.course)
      this.$store.dispatch('updateTab', 'course')
    }
  }
}
</script>

<style lang="scss">
  .next-course {
    font-size: 24px;

    .course-description {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

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
