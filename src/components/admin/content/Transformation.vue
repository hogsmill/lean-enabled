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
            <span v-if="!editing">
              <p v-for="(para, index) in transformation.text" :key="index">
                {{ para }}
              </p>
            </span>
            <span v-if="editing">
              <table class="paragraphs">
                <tr v-for="(t, tindex) in transformation.text" :key="tindex">
                  <td>
                    <textarea :id="'paragraph-' + tindex" :value="t" />
                  </td>
                  <td>
                    <i class="fas fa-times" title="Delete this paragraph" @click="deleteParagraph(tindex)" />
                  </td>
                </tr>
              </table>
              <button class="btn btn-primary smaller-font" @click="addParagraph()">
                Add New Paragraph
              </button>
            </span>
          </td>
          <td>
            <p v-if="!editing">
              <i>{{ transformation.quote.text }}</i>
            </p>
            <p v-if="!editing">
              {{ transformation.quote.author }}
            </p>
            <textarea class="quote-edit" id="editing-transformation-quote-text" v-if="editing" :value="transformation.quote.text" />
            <textarea class="quote-edit" id="editing-transformation-quote-author" v-if="editing" :value="transformation.quote.author" />
          </td>
          <td>
            <i class="far fa-edit" title="Edit transformation" @click="edit()" />
            <i class="far fa-save" title="Save transformation" :class="{'disabled': !editing}" @click="save()" />
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
      editing: false,
      text: []
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
      this.editing = true
      this.text = this.transformation.text
    },
    addParagraph() {
      this.text.push('')
    },
    save() {
      const text = []
      for (let i = 0; i < this.text.length; i++) {
        const para = document.getElementById('paragraph-' + i).value
        text.push(para)
      }
      const data = {
        type: 'transformation',
        id: this.transformation.id,
        text: text,
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
