<template>
  <div>
    <h3>
      You Tube Video (Front Page)
      <i v-if="expanded != 'youTube'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'youTube'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
    </h3>
    <table v-if="expanded == 'youTube'">
      <thead>
        <tr>
          <th>
            Video URL
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span v-if="!editing">
              {{ youTube.url }}
            </span>
            <input v-if="editing" type="text" id="editing-url" :value="youTube.url">
          </td>
          <td>
            <i class="far fa-edit" title="Edit" @click="edit()" />
            <i class="far fa-save" title="Save" :class="{'disabled': !editing}" @click="save()" />
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
      editing: false
    }
  },
  computed: {
    expanded() {
      return this.$store.getters.getExpanded
    },
    youTube() {
      return this.$store.getters.getContentYouTube
    }
  },
  created() {

    bus.emit('sendLoad', 'contentYouTube')

    bus.on('load', (data) => {
      if (data.type == 'contentYouTube') {
        this.$store.dispatch('updateContent', {type: 'youTube', content: data.objects[0]})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'youTube' ? '' : 'youTube'
      this.$store.dispatch('updateExpanded', expanded)
    },
    edit() {
      this.editing = true
    },
    save() {
      const data = this.youTube
      delete data._id
      data.url = document.getElementById('editing-url').value,
      bus.emit('sendUpdate', data)
      this.editing = ''
    }
  }
}
</script>

<style lang="scss">
</style>
