<template>
  <div class="course-comments">
    <h3>
      Course Comments
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Level
          </th>
          <th>
            Comments
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(comments, index) in courseComments" :key="index">
          <td>
            {{ comments.level }}
          </td>
          <td>
            <table>
              <tr v-for="(comment, i) in comments.comments" :key="i">
                <td class="left">
                  <span v-if="editing.level != comments.level || editing.i != i">
                    {{ comment }}
                  </span>
                  <input type="text" id="editing-comment" v-if="editing.level == comments.level && editing.i == i" :value="comment">
                </td>
                <td>
                  <i class="far fa-edit" name="Edit Course" @click="editComment(comments.level, i)" />
                  <i class="far fa-save" name="Save Course" :class="{'disabled': editing.level != comments.level || editing.i != i}" @click="saveComment(comments.level, i)" />
                  <i class="far fa-trash-alt" name="Delete Course" @click="deleteComment(comments.level, i)" />
                </td>
              </tr>
            </table>
            <button class="btn btn-sm btn-secondary smaller-font" @click="addComment(comments.level)">
              Add Comment
            </button>
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
      editing: {
        level: '',
        i: ''
      }
    }
  },
  computed: {
    courseComments() {
      return this.$store.getters.getCourseComments
    }
  },
  created() {

    bus.emit('sendLoad', 'courseComment')

    bus.on('load', (data) => {
      if (data.type == 'courseComment') {
        this.$store.dispatch('updateCourseComments', data.objects)
      }
    })
  },
  methods: {
    editComment(level, n) {
      this.editing = {
        level: level,
        i: n
      }
    },
    saveComment(level, n) {
      const data = this.courseComments.find((c) => {
        return c.level == level
      })
      const comments = []
      for (let i = 0; i < data.comments.length; i++) {
        let comment = data.comments[i]
        if (i == n) {
          comment = document.getElementById('editing-comment').value
        }
        comments.push(comment)
      }
      delete data._id
      data.comments = comments
      bus.emit('sendUpdate', data)
      this.editing = {}
    },
    addComment(level, n) {
      const data = this.courseComments.find((c) => {
        return c.level == level
      })
      // TODO: Why do we need this?
      delete data._id
      data.comments.push('')
      bus.emit('sendUpdate', data)
    },
    deleteComment(level, n) {
      const data = this.courseComments.find((c) => {
        return c.level == level
      })
      const comments = []
      for (let i = 0; i < data.comments.length; i++) {
        if (i != n) {
          comments.push(data.comments[i])
        }
      }
      // TODO: Why do we need this?
      delete data._id
      data.comments = comments
      console.log(data)
      bus.emit('sendUpdate', data)
    }
  }
}
</script>

<style lang="scss">
.course-comments {

  .left {
    text-align: left;
  }

  input {
    width: 100%;
  }
}
</style>
