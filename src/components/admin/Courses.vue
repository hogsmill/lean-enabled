<template>
  <div>
    <h3>
      New Course
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Type
          </th>
          <th>
            Level
          </th>
          <th>
            Lean Six Sigma?
          </th>
          <th>
            Belt
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input id="new-name" type="text">
          </td>
          <td>
            <input id="new-type" type="text" value="Standard">
          </td>
          <td>
            <select id="new-level">
              <option value="">
                -- Select --
              </option>
              <option v-for="(n, nindex) in 6" :key="nindex">
                {{ n }}
              </option>
            </select>
          </td>
          <td>
            <input id="new-lean-six-sigma" type="checkbox">
          </td>
          <td>
            <select id="new-belt">
              <option value="">
                -- Select --
              </option>
              <option v-for="(belt, bindex) in belts" :key="bindex">
                {{ belt }}
              </option>
            </select>
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addCourse()">
              Add New
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
            Name
          </th>
          <th>
            Type
          </th>
          <th>
            Level
          </th>
          <th>
            Lean Six Sigma?
          </th>
          <th>
            Belt
          </th>
          <th>
            Modules
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in courses" :key="index">
          <td>
            <span v-if="editing.id != course.id">
              {{ course.name }}
            </span>
            <input v-if="editing.id == course.id" id="editing-name" type="text" :value="course.name">
          </td>
          <td>
            <span v-if="editing.id != course.id">
              {{ course.type }}
            </span>
            <input v-if="editing.id == course.id" id="editing-type" type="text" :value="course.type">
          </td>
          <td>
            <select id="editing-level" :value="course.level">
              <option value="">
                -- Select --
              </option>
              <option v-for="(n, nindex) in 6" :key="nindex">
                {{ n }}
              </option>
            </select>
          </td>
          <td>
            <input id="editing-lean-six-sigma" type="checkbox" :checked="course.leanSixSigma">
          </td>
          <td>
            <select id="editing-belt" :value="course.belt">
              <option value="">
                -- Select --
              </option>
              <option v-for="(belt, bindex) in belts" :key="bindex">
                {{ belt }}
              </option>
            </select>
          </td>
          <td>
            <table>
              <thead>
                <tr>
                  <th>
                    No.
                  </th>
                  <th>
                    Name
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr v-for="(module, mindex) in course.modules" :key="mindex">
                  <td>
                    <span v-if="editingModule.courseId != course.id || editingModule.module.id != module.id">
                      {{ module.number }}
                    </span>
                    <input type="text" id="editing-module-number"
                           v-if="editingModule.courseId == course.id && editingModule.module.id == module.id"
                           :value="module.number"
                    >
                  </td>
                  <td>
                    <span v-if="editingModule.courseId != course.id || editingModule.module.id != module.id">
                      {{ module.name }}
                    </span>
                    <input type="text" id="editing-module-name"
                           v-if="editingModule.courseId == course.id && editingModule.module.id == module.id"
                           :value="module.name"
                    >
                  </td>
                  <td>
                    <i class="far fa-edit" :name="'Edit Module ' + module.number" @click="editModule(course, module)" />
                    <i class="far fa-save" :name="'Save Module ' + module.number"
                      :class="{'disabled': editingModule.courseId != course.id || editingModule.module.id != module.id}" @click="saveModule(course, module)" />
                    <i class="far fa-trash-alt" :name="'Delete Module ' + module.number" @click="deleteModule(course, module)" />
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-primary smaller-font" @click="addModule(course)">
              Add New
            </button>
          </td>
          <td>
            <i class="far fa-edit" name="Edit Course" @click="editCourse(course)" />
            <i class="far fa-save" name="Save Course" :class="{'disabled': editing.id != course.id}" @click="saveCourse(course)" />
            <i class="far fa-trash-alt" name="Delete Course" @click="deleteCourse(course)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

import bus from '../../socket.js'

export default {
  data() {
    return {
      editing: {},
      editingModule: {
        courseId: '',
        module: {}
      },
      belts: [
        'yellow',
        'green',
        'black',
        'master-black'
      ]
    }
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
  },
  methods: {
    addCourse() {
      const data = {
        type: 'course',
        name: document.getElementById('new-name').value,
        courseType: document.getElementById('new-type').value,
        level: document.getElementById('new-level').value,
        leanSixSigma: document.getElementById('new-lean-six-sigma').value,
        belt: document.getElementById('new-belt').value
      }
      bus.emit('sendCreate', data)
    },
    addModule(course) {
      const modules = course.modules
      modules.push({
        id: uuidv4(),
        number: '',
        number: ''
      })
      course.modules = modules
      bus.emit('sendUpdate', course)
    },
    editCourse(course) {
      this.editing = course
    },
    editModule(course, module) {
      this.editingModule = {
        courseId: course.id,
        module: module
      }
    },
    saveCourse() {
      const data = {
        type: 'course',
        id: this.editing.id,
        name: document.getElementById('editing-name').value,
        courseType: document.getElementById('editing-type').value,
        level: document.getElementById('editing-level').value,
        leanSixSigma: document.getElementById('editing-lean-six-sigma').value,
        belt: document.getElementById('editing-belt').value
      }
      bus.emit('sendUpdate', data)
      this.editing = {}
    },
    saveModule() {
      const moduleNumber = document.getElementById('editing-module-number').value
      const moduleName = document.getElementById('editing-module-name').value
      const course = this.courses.find((c) => {
        return c.id == this.editingModule.courseId
      })
      const modules = []
      for (let i = 0; i < course.modules.length; i++) {
        const module = course.modules[i]
        if (module.id == this.editingModule.module.id) {
          module.number = moduleNumber
          module.name = moduleName
        }
        modules.push(module)
      }
      course.modules = modules
      bus.emit('sendUpdate', course)
      this.editingModule = {
        courseId: '',
        module: {}
      }
    },
    deleteCourse(course) {
      bus.emit('sendDelete', {type: 'course', id: course.id})
    },
    deleteModule(course, module) {
      const modules = []
      for (let i = 0; i < course.modules.length; i++) {
        if (module.id != course.modules[i].id) {
          modules.push(module)
        }
      }
      course.modules = modules
      bus.emit('sendUpdate', course)
    }
  }
}
</script>

<style lang="scss">
</style>
