<template>
  <div>
  {{ emails }}
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
            <span v-if="editing != email.email">
              {{ email.email }}
            </span>
            <input v-if="editing == email.email" id="editing-email" type="text" :value="email.email">
          </td>
          <td>
            <span v-if="editing != email.email">
              {{ email.name}}
            </span>
            <input v-if="editing == email.email" id="editing-name" type="text" :value="email.name">
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

    bus.emit('sendLoadEmails')

    bus.on('loadEmails', (data) => {
      console.log('here')
      this.$store.dispatch('updateEmails', data)
    })
  },
  methods: {
    addEmail() {
      const data = {
        email: document.getElementById('new-email').value,
        name: document.getElementById('new-name').value,
      }
      bus.emit('sendCreateEmail', data)
    },
    editEmail(email) {
      this.editing = email.email
    },
    saveEmail() {
      const data = {
        oldEmail: this.editing,
        email: document.getElementById('editing-email').value,
        name: document.getElementById('editing-name').value,
      }
      bus.emit('sendUpdateEmail', data)
      this.editing = ''
    },
    deleteemail(email) {
      bus.emit('sendDeleteEmail', {email: email.email})
    }
  }
}
</script>

<style lang="scss">
</style>
