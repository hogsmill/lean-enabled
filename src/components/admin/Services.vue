<template>
  <div>
    <h3>
      New Service
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Title
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
            <input id="new-title" type="text">
          </td>
          <td>
            <textarea id="new-descriptopn" type="text" />
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addservice()">
              Add New
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      Services
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Title
          </th>
          <th>
            Description
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in services" :key="index">
          <td>
            <span v-if="editing.id != service.id">
              {{ service.title }}
            </span>
            <input v-if="editing.id == service.id" id="editing-title" type="text" :value="service.title">
          </td>
          <td>
            <span v-if="editing.id != service.id">
              {{ service.description }}
            </span>
            <textarea v-if="editing.id == service.id" id="editing-description" type="text" :value="service.description" />
          </td>
          <td>
            <i class="far fa-edit" :title="'Edit ' + service.title" @click="editService(service)" />
            <i class="far fa-save" :title="'Save ' + service.title" :class="{'disabled': editing.id != service.id}" @click="saveService(service)" />
            <i class="far fa-trash-alt" :title="'Delete ' + service.title" @click="deleteService(service)" />
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
    services() {
      return this.$store.getters.getServices
    }
  },
  created() {

    bus.emit('sendLoad', 'service')

    bus.on('load', (data) => {
      if (data.type == 'service') {
        this.$store.dispatch('updateServices', data.objects)
      }
    })
  },
  methods: {
    addService() {
      const data = {
        type: 'service',
        title: document.getElementById('new-title').value,
        description: document.getElementById('new-description').value
      }
      bus.emit('sendCreate', data)
    },
    editService(service) {
      this.editing = service
    },
    saveService() {
      const data = {
        type: 'service',
        id: this.editing.id,
        title: document.getElementById('editing-title').value,
        description: document.getElementById('editing-description').value
      }
      bus.emit('sendUpdate', data)
      this.editing = {}
    },
    deleteService(service) {
      bus.emit('sendDeleteService', {type: 'service', id: service.id})
    }
  }
}
</script>

<style lang="scss">
</style>
