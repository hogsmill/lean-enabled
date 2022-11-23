<template>
  <div>
    <h3>
      Mission
      <i v-if="expanded != 'mission'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'mission'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
    </h3>
    <span class="edit-hint" v-if="editing">
      (<i>Use "[text]" for links to site pages</i>)
    </span>
    <table v-if="expanded == 'mission'">
      <tr>
        <td>
          <p v-if="editing != 'mission'">
            {{ mission.text }}
          </p>
          <textarea id="editing-mission" v-if="editing == 'mission'" :value="mission.text" />
        </td>
        <td>
          <i class="far fa-edit" title="Edit mission" @click="edit()" />
          <i class="far fa-save" title="Save mission" :class="{'disabled': editing != 'mission'}" @click="save()" />
        </td>
      </tr>
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
    mission() {
      return this.$store.getters.getContentMission
    }
  },
  created() {

    bus.emit('sendLoad', 'mission')

    bus.on('load', (data) => {
      if (data.type == 'mission') {
        this.$store.dispatch('updateContent', {type: 'mission', content: data.objects[0]})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'mission' ? '' : 'mission'
      this.$store.dispatch('updateExpanded', expanded)
    },
    edit() {
      this.editing = 'mission'
    },
    save() {
      const data = {
        type: 'mission',
        id: this.mission.id,
        text: document.getElementById('editing-mission').value
      }
      bus.emit('sendUpdate', data)
      this.editing = ''
    }
  }
}
</script>

<style lang="scss">
</style>
