<template>
  <div>
    <h3>
      New Email
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Email
          </th>
          <th>
            Name (optional)
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input id="new-email" type="text">
          </td>
          <td>
            <input id="new-name" type="text">
          </td>
          <td>
            <button class="btn btn-sm btn-secondary smaller-font" @click="addEmail()">
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      Emails
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Email
          </th>
          <th>
            Name
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(email, index) in emails" :key="index">
          <td>
            <span v-if="editing.id != email.id">
              {{ email.email }}
            </span>
            <input v-if="editing.id == email.id" id="editing-email" type="text" :value="email.email">
          </td>
          <td>
            <span v-if="editing.id != email.id">
              {{ email.name }}
            </span>
            <input v-if="editing.id == email.id" id="editing-name" type="text" :value="email.name">
          </td>
          <td>
            <i class="far fa-edit" :title="'Edit ' + email.email" @click="editEmail(email)" />
            <i class="far fa-save" :title="'Save ' + email.email" :class="{'disabled': editing != email.email}" @click="saveEmail(email)" />
            <i class="far fa-trash-alt" :title="'Delete ' + email.email" @click="deleteEmail(email)" />
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
      editing: ''
    }
  },
  computed: {
    emails() {
      return this.$store.getters.getEmails
    }
  },
  created() {

    bus.emit('sendLoad', 'email')

    bus.on('load', (data) => {
      if (data.type == 'email') {
        this.$store.dispatch('updateEmails', data.objects)
      }
    })
  },
  methods: {
    addEmail() {
      const data = {
        type: 'email',
        email: document.getElementById('new-email').value,
        name: document.getElementById('new-name').value,
      }
      bus.emit('sendCreate', data)
    },
    editEmail(email) {
      this.editing = email
    },
    saveEmail() {
      const data = {
        id: this.editing.id,
        type: 'email',
        email: document.getElementById('editing-email').value,
        name: document.getElementById('editing-name').value,
      }
      bus.emit('sendUpdate', data)
      this.editing = ''
    },
    deleteEmail(email) {
      bus.emit('sendDelete', {type: 'email', mail: email.email})
    }
  }
}
</script>

<style lang="scss">
</style>
