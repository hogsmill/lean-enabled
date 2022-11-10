<template>
  <div>
    <h3>
      New Course
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Date
          </th>
          <th>
            Course
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <select id="new-day">
              <option value="">
                -- DD --
              </option>
              <option v-for="(day, d) in 31" :key="d">
                {{ day }}
              </option>
            </select>
            <select id="new-month">
              <option value="">
                -- MM --
              </option>
              <option v-for="(month, m) in 12" :key="m">
                {{ month }}
              </option>
            </select>
            <select id="new-year">
              <option value="">
                -- YY --
              </option>
              <option v-for="(year, y) in 5" :key="y">
                {{ 2021 + year }}
              </option>
            </select>
          </td>
          <td>
            <select id="new-description">
              <option>
                -- Select --
              </option>
              <option v-for="(course, cind) in courses" :key="cind" :value="course.id">
                {{ courseDescription(course.id) }}
              </option>
            </select>
          </td>
          <td>
            <button class="btn btn-sm btn-secondary smaller-font" @click="addCourse()">
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      Courses
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Date
          </th>
          <th>
            Course
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(courseDate, index) in courseDates" :key="index">
          <td>
            <span v-if="editing.id != courseDate.id">
              {{ courseDate.day }}/{{ courseDate.month }}/{{ courseDate.year }}
            </span>
            <select v-if="editing.id == courseDate.id" id="editing-day" :value="editing.day">
              <option value="">
                -- DD --
              </option>
              <option v-for="(day, d) in 31" :key="d">
                {{ day }}
              </option>
            </select>
            <select v-if="editing.id == courseDate.id" id="editing-month" :value="editing.month">
              <option value="">
                -- MM --
              </option>
              <option v-for="(month, m) in 12" :key="m">
                {{ month }}
              </option>
            </select>
            <select v-if="editing.id == courseDate.id" id="editing-year" :value="editing.year">
              <option value="">
                -- YY --
              </option>
              <option v-for="(year, y) in 5" :key="y">
                {{ 2021 + year }}
              </option>
            </select>
          </td>
          <td>
            <span v-if="editing.id != courseDate.id">
              {{ courseDescription(courseDate.courseId) }}
            </span>
            <select v-if="editing.id == courseDate.id" id="editing-description" :value="courseDate.courseId">
              <option>
                -- Select --
              </option>
              <option v-for="(course, cindex) in courses" :key="cindex" :value="course.id">
                {{ courseDescription(course.id) }}
              </option>
            </select>
          </td>
          <td>
            <i class="far fa-edit" title="Edit" @click="editCourse(courseDate)" />
            <i class="far fa-save" title="Save" :class="{'disabled': editing.id != courseDate.id}" @click="saveCourse(courseDate)" />
            <i class="far fa-trash-alt" title="Delete" @click="deleteCourse(courseDate)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      editing: {}
    }
  },
  computed: {
    courses() {
      return this.$store.getters.getCourses
    },
    courseDates() {
      return this.$store.getters.getCourseDates
    }
  },
  created() {

    bus.emit('sendLoadCourseDates')

    bus.on('loadCourseDates', (data) => {
      this.$store.dispatch('updateCourseDates', data)
    })
  },
  methods: {
    courseDescription(id) {
      const course = this.courses.find((c) => {
        return c.id == id
      })
      return course.name + ' (level ' + course.level + ')'
    },
    addCourse() {
      const data = {
        day: document.getElementById('new-day').value,
        month: document.getElementById('new-month').value,
        year: document.getElementById('new-year').value,
        courseId: document.getElementById('new-description').value
      }
      bus.emit('sendCreateCourseDate', data)
    },
    editCourse(courseDate) {
      this.editing = courseDate
    },
    saveCourse() {
      const data = {
        id: this.editing.id,
        day: document.getElementById('editing-day').value,
        month: document.getElementById('editing-month').value,
        year: document.getElementById('editing-year').value,
        courseId: document.getElementById('editing-description').value
      }
      bus.emit('sendUpdateCourseDate', data)
      this.editing = {}
    },
    deleteCourse(courseDate) {
      bus.emit('sendDeleteCourseDate', {id: courseDate.id})
    }
  }
}
</script>

<style lang="scss">
select {
  margin: 2px;
}
</style>
