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
            Level
          </th>
          <th>
            Description
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
            <select id="new-level">
              <option>
                -- Select --
              </option>
              <option>
                4
              </option>
              <option>
                5
              </option>
              <option>
                6
              </option>
            </select>
          </td>
          <td>
            <input id="new-description" type="text">
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
            Level
          </th>
          <th>
            Description
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in courses" :key="index">
          <td>
            <span v-if="editing.id != course.id">
              {{ course.day }}/{{ course.month }}/{{ course.year }}
            </span>
            <select v-if="editing.id == course.id" id="editing-day" :value="editing.day">
              <option value="">
                -- DD --
              </option>
              <option v-for="(day, d) in 31" :key="d">
                {{ day }}
              </option>
            </select>
            <select v-if="editing.id == course.id" id="editing-month" :value="editing.month">
              <option value="">
                -- MM --
              </option>
              <option v-for="(month, m) in 12" :key="m">
                {{ month }}
              </option>
            </select>
            <select v-if="editing.id == course.id" id="editing-year" :value="editing.year">
              <option value="">
                -- YY --
              </option>
              <option v-for="(year, y) in 5" :key="y">
                {{ 2021 + year }}
              </option>
            </select>
          </td>
          <td>
            <span v-if="editing.id != course.id">
              {{ course.level}}
            </span>
            <select v-if="editing.id == course.id" id="editing-level" :value="editing.level">
              <option>
                -- Select --
              </option>
              <option>
                4
              </option>
              <option>
                5
              </option>
              <option>
                6
              </option>
            </select>
          </td>
          <td>
            <span v-if="editing.id != course.id">
              {{ course.description }}
            </span>
            <input v-if="editing.id == course.id" id="editing-description" type="text" :value="course.description">
          </td>
          <td>
            <i class="far fa-edit" title="Edit" @click="editCourse(course)" />
            <i class="far fa-save" title="Save" :class="{'disabled': editing.id != course.id}" @click="saveCourse(course)" />
            <i class="far fa-trash-alt" title="Delete" @click="deleteCourse(course)" />
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
    }
  },
  created() {

    bus.emit('sendLoadCourseDates')

    bus.on('loadCourseDates', (data) => {
      this.$store.dispatch('updateCourseDates', data)
    })
  },
  methods: {
    addCourse() {
      const data = {
        day: document.getElementById('new-day').value,
        month: document.getElementById('new-month').value,
        year: document.getElementById('new-year').value,
        level: document.getElementById('new-level').value,
        description: document.getElementById('new-description').value
      }
      bus.emit('sendCreateCourseDate', data)
    },
    editCourse(course) {
      this.editing = course
    },
    saveCourse() {
      const data = {
        id: this.editing.id,
        day: document.getElementById('editing-day').value,
        month: document.getElementById('editing-month').value,
        year: document.getElementById('editing-year').value,
        level: document.getElementById('editing-level').value,
        description: document.getElementById('editing-description').value
      }
      bus.emit('sendUpdateCourseDate', data)
      this.editing = {}
    },
    deleteCourse(course) {
      bus.emit('sendDeleteCourseDate', {id: course.id})
    }
  }
}
</script>

<style lang="scss">
</style>
