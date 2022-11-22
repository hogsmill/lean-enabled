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
      <thead>
        <tr>
          <th>
            Text
          </th>
          <th>
            Quote
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p v-if="editing != 'transformation'">
              {{ transformation.text }}
            </p>
            <textarea id="editing-transformation-text" v-if="editing == 'transformation'" :value="transformation.text" />
          </td>
          <td>
            <p v-if="editing != 'transformation'">
              <i>{{ transformation.quote.text }}</i>
            </p>
            <p v-if="editing != 'transformation'">
              {{ transformation.quote.author }}
            </p>
            <textarea class="quote-edit" id="editing-transformation-quote-text" v-if="editing == 'transformation'" :value="transformation.quote.text" />
            <textarea class="quote-edit" id="editing-transformation-quote-author" v-if="editing == 'transformation'" :value="transformation.quote.author" />
          </td>
          <td>
            <i class="far fa-edit" title="Edit transformation" @click="edit()" />
            <i class="far fa-save" title="Save transformation" :class="{'disabled': editing != 'transformation'}" @click="save()" />
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
        text: document.getElementById('editing-transformation-text').value,
        quote: {
          text: document.getElementById('editing-transformation-quote-text').value,
          author: document.getElementById('editing-transformation-quote-author').value
        }
      }
      bus.emit('sendUpdate', data)
      this.editing = ''
    }
  }
}
</script>

<style lang="scss">
</style>
