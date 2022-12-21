<template>
  <div>
    <h3>
      Header
      <i v-if="expanded != 'header'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'header'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
    </h3>
    <table v-if="expanded == 'header'">
      <thead>
        <tr>
          <th>
            Tab
          </th>
          <th>
            Text
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tab, index) in Object.keys(clean(header))" :key="index">
          <td>
            {{ tab }}
          </td>
          <td>
            <span v-if="editing != tab">
              {{ header[tab] }}
            </span>
            <input :id="'editing-' + tab" v-if="editing == tab" :value="header[tab]">
          </td>
          <td>
            <i class="far fa-edit" title="Edit" @click="edit(tab)" />
            <i class="far fa-save" title="Save" :class="{'disabled': editing != tab}" @click="save(tab)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../../socket.js'

export default {
  data() {
    return {
      editing: ''
    }
  },
  computed: {
    expanded() {
      return this.$store.getters.getExpanded
    },
    header() {
      return this.$store.getters.getHeader
    }
  },
  created() {

    bus.emit('sendLoad', 'header')

    bus.on('load', (data) => {
      if (data.type == 'header') {
        this.$store.dispatch('updateContent', {type: 'header', content: data.objects[0]})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'header' ? '' : 'header'
      this.$store.dispatch('updateExpanded', expanded)
    },
    clean(object) {
      const obj = {}
      const keys = Object.keys(object)
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] != 'id' && keys[i] != '_id' && keys[i] != 'type') {
          obj[keys[i]] = object[keys[i]]
        }
      }
      return obj
    },
    edit(tab) {
      this.editing = tab
    },
    save(tab) {
      const data = this.header
      delete data._id
      data[tab] = document.getElementById('editing-' + tab).value
      bus.emit('sendUpdate', data)
      this.editing = ''
    }
  }
}
</script>

<style lang="scss">
</style>
