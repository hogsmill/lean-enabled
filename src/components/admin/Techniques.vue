<template>
  <div>
    <h3>
      New Technique
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
            <textarea id="new-description" type="text" />
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addTechnique()">
              Add New
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      Techniques
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
        <tr v-for="(technique, index) in techniques" :key="index">
          <td>
            <span v-if="editing.id != technique.id">
              {{ technique.title }}
            </span>
            <input v-if="editing.id == technique.id" id="editing-title" type="text" :value="technique.title">
          </td>
          <td>
            <span v-if="editing.id != technique.id">
              {{ technique.description }}
            </span>
            <textarea v-if="editing.id == technique.id" id="editing-description" type="text" :value="technique.description" />
          </td>
          <td>
            <i class="far fa-edit" :title="'Edit ' + technique.title" @click="editTechnique(technique)" />
            <i class="far fa-save" :title="'Save ' + technique.title" :class="{'disabled': editing.id != technique.id}" @click="saveTechnique(technique)" />
            <i class="far fa-trash-alt" :title="'Delete ' + technique.title" @click="deleteTechnique(technique)" />
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
    techniques() {
      return this.$store.getters.getTechniques
    }
  },
  created() {

    bus.emit('sendLoad', 'technique')

    bus.on('load', (data) => {
      if (data.type == 'technique') {
        this.$store.dispatch('updateTechniques', data.objects)
      }
    })
  },
  methods: {
    addTechnique() {
      const data = {
        type: 'technique',
        title: document.getElementById('new-title').value,
        description: document.getElementById('new-description').value
      }
      bus.emit('sendCreate', data)
    },
    editTechnique(technique) {
      this.editing = technique
    },
    saveTechnique() {
      const data = {
        type: 'technique',
        id: this.editing.id,
        title: document.getElementById('editing-title').value,
        description: document.getElementById('editing-description').value
      }
      bus.emit('sendUpdate', data)
      this.editing = {}
    },
    deleteTechnique(technique) {
      bus.emit('sendDeleteTechnique', {type: 'technique', id: technique.id})
    }
  }
}
</script>

<style lang="scss">
</style>
