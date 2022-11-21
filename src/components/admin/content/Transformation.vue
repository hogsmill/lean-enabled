<template>
  <div>
    <h3>
      Transformation
      <i v-if="expanded != 'transformation'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'transformation'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
    </h3>
    <span class="edit-hint" v-if="editing">
      (<i>Use "[text]" for links to site pages</i>)
    </span>
    <table v-if="expanded == 'transformation'">
      <tr>
        <td>
          <p v-if="editing != 'transformation'">
            {{ transformation.text }}
          </p>
          <textarea id="editing-transformation" v-if="editing == 'transformation'" :value="transformation.text" />
        </td>
        <td>
          <i class="far fa-edit" title="Edit transformation" @click="edit()" />
          <i class="far fa-save" title="Save transformation" :class="{'disabled': editing != 'transformation'}" @click="save()" />
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
    transformation() {
      return this.$store.getters.getContentTransformation
    }
  },
  created() {

    bus.emit('sendLoad', 'transformation')

    bus.on('load', (data) => {
      if (data.type == 'transformation') {
        this.$store.dispatch('updateContent', {type: 'transformation', content: data.objects[0]})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'transformation' ? '' : 'transformation'
      this.$store.dispatch('updateExpanded', expanded)
    },
    edit() {
      this.editing = 'transformation'
    },
    save() {
      const data = {
        type: 'transformation',
        id: this.transformation.id,
        text: document.getElementById('editing-transformation').value
      }
      bus.emit('sendUpdate', data)
      this.editing = ''
    }
  }
}
</script>

<style lang="scss">
</style>
