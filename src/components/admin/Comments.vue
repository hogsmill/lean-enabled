<template>
  <div>
    <h3>
      New Comment
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Author
          </th>
          <td>
            Scope
          </td>
          <th>
            Comment
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input id="new-author" type="text">
          </td>
          <td>
            <select id="new-scope">
              <option value="">
                -- Select --
              </option>
              <option value="stakeholder">
                Stakeholder
              </option>
              <option value="stakeholder">
                Staff
              </option>
            </select>
          </td>
          <td>
            <input id="new-comment" type="text">
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addComment()">
              Add New
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      Comments
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Author
          </th>
          <th>
            Scope
          </th>
          <th>
            Comment
          </th>
          <th>
            Enabled
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(comment, index) in comments" :key="index">
          <td class="left">
            <span v-if="editing.id != comment.id">
              {{ comment.author }}
            </span>
            <input v-if="editing.id == comment.id" id="editing-author" type="text" :value="comment.author">
          </td>
          <td>
            <span v-if="editing.id != comment.id">
              {{ comment.scope }}
            </span>
            <select v-if="editing.id == comment.id" id="editing-scope" :value="comment.scope">
              <option value="">
                -- Select --
              </option>
              <option value="stakeholder">
                Stakeholder
              </option>
              <option value="stakeholder">
                Staff
              </option>
            </select>
          </td>
          <td class="left">
            <span v-if="editing.id != comment.id">
              {{ comment.comment }}
            </span>
            <textarea v-if="editing.id == comment.id" id="editing-comment" type="text" :value="comment.comment" />
          </td>
          <td>
            <span v-if="editing.id != comment.id">
              <i v-if="comment.enabled" class="fas fa-check" />
              <i v-if="!comment.enabled" class="fas fa-times" />
            </span>
            <input v-if="editing.id == comment.id" id="editing-enabled" type="checkbox" :comment="comment.enabled">
          </td>
          <td>
            <i class="far fa-edit" title="Edit Comment" @click="editComment(comment)" />
            <i class="far fa-save" title="Save Comment" :class="{'disabled': editing.id != comment.id}" @click="saveComment(comment)" />
            <i class="far fa-trash-alt" title="Delete Comment" @click="deleteComment(comment)" />
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
    comments() {
      return this.$store.getters.getComments
    }
  },
  created() {

    bus.emit('sendLoad', 'comment')

    bus.on('load', (data) => {
      if (data.type == 'comment') {
        this.$store.dispatch('updateComments', data.objects)
      }
    })
  },
  methods: {
    addComment() {
      const data = {
        type: 'comment',
        author: document.getElementById('new-author').value,
        comment: document.getElementById('new-comment').value
      }
      bus.emit('sendCreate', data)
    },
    editComment(comment) {
      this.editing = comment
    },
    saveComment() {
      const data = {
        type: 'comment',
        id: this.editing.id,
        author: document.getElementById('editing-author').value,
        comment: document.getElementById('editing-comment').value,
        enabled: document.getElementById('editing-enabled').checked
      }
      bus.emit('sendUpdate', data)
      this.editing = {}
    },
    deleteComment(comment) {
      bus.emit('sendDelete', {type: 'comment', id: comment.id})
    }
  }
}
</script>

<style lang="scss">
</style>
