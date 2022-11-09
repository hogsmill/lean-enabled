<template>
  <div>
    <h3>
      New User
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Username
          </th>
          <th>
            Passcode
          </th>
          <th>
            Admin
          </th>
          <th>
            Site Admin
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input id="new-username" type="text">
          </td>
          <td>
            <input id="new-passcode" type="text">
          </td>
          <td>
            <input id="new-admin" type="checkbox">
          </td>
          <td>
            <input id="new-siteadmin" type="checkbox">
          </td>
          <td>
            <button class="btn btn-sm btn-secondary smaller-font" @click="addUser()">
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      Users
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Username
          </th>
          <th>
            Passcode
          </th>
          <th>
            Admin
          </th>
          <th>
            Site Admin
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>
            <span v-if="editing != user.userName">
              {{ user.userName }}
            </span>
            <input v-if="editing == user.userName" id="editing-username" type="text" :value="user.userName">
          </td>
          <td>
            <span v-if="editing != user.userName">
              {{ user.passCode }}
            </span>
            <input v-if="editing == user.userName" id="editing-passcode" type="text" :value="user.passCode">
          </td>
          <td>
            <span v-if="editing != user.userName">
              <i v-if="user.admin" class="fas fa-check" />
              <i v-if="!user.admin" class="fas fa-times" />
            </span>
            <input v-if="editing == user.userName" id="editing-admin" type="checkbox" :checked="user.admin">
          </td>
          <td>
            <span v-if="editing != user.userName">
              <i v-if="user.siteAdmin" class="fas fa-check" />
              <i v-if="!user.siteAdmin" class="fas fa-times" />
            </span>
            <input v-if="editing == user.userName" id="editing-siteadmin" type="checkbox" :checked="user.siteAdmin">
          </td>
          <td>
            <i class="far fa-edit" :title="'Edit ' + user.userName" @click="editUser(user)" />
            <i class="far fa-save" :title="'Save ' + user.userName" :class="{'disabled': editing != user.userName}" @click="saveUser(user)" />
            <i class="far fa-trash-alt" :title="'Delete ' + user.userName" @click="deleteUser(user)" />
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
    users() {
      return this.$store.getters.getUsers
    }
  },
  created() {

    bus.emit('sendLoadUsers')

    bus.on('loadUsers', (data) => {
      this.$store.dispatch('updateUsers', data)
    })
  },
  methods: {
    addUser() {
      const data = {
        userName: document.getElementById('new-username').value,
        passCode: document.getElementById('new-passcode').value,
        admin: document.getElementById('new-admin').checked,
        siteAdmin: document.getElementById('new-siteadmin').checked
      }
      bus.emit('sendCreateUser', data)
    },
    editUser(user) {
      this.editing = user.userName
    },
    saveUser() {
      const data = {
        oldUserName: this.editing,
        userName: document.getElementById('editing-username').value,
        passCode: document.getElementById('editing-passcode').value,
        admin: document.getElementById('editing-admin').checked,
        siteAdmin: document.getElementById('editing-siteadmin').checked
      }
      bus.emit('sendUpdateUser', data)
      this.editing = ''
    },
    deleteUser(user) {
      bus.emit('sendDeleteUser', {userName: user.userName})
    }
  }
}
</script>

<style lang="scss">
</style>
