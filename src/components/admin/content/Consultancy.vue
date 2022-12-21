<template>
  <div>
    <h3>
      Consultancy
      <i v-if="expanded != 'consultancy'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'consultancy'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'consultancy'" class="fas fa-question-circle" @click="toggleShowHelp()" />
    </h3>
    <div v-if="expanded == 'consultancy'">
      <Help v-if="showHelp" />
      <table>
        <thead>
          <tr>
            <th>
              Text
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span v-if="!editing">
                <p v-for="(t, tindex) in consultancy.text" :key="tindex">
                  {{ t }}
                </p>
              </span>
              <span v-if="editing">
                <table class="paragraphs">
                  <tr v-for="(t, tindex) in consultancy.text" :key="tindex">
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
              <i class="far fa-edit" title="Edit" @click="edit()" />
              <i class="far fa-save" title="Save" :class="{'disabled': !editing}" @click="save()" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import bus from '../../../socket.js'

import Help from './Help.vue'

export default {
  components: {
    Help
  },
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
    showHelp() {
      return this.$store.getters.getShowHelp
    },
    consultancy() {
      return this.$store.getters.getContentConsultancy
    }
  },
  created() {

    bus.emit('sendLoad', 'contentConsultancy')

    bus.on('load', (data) => {
      if (data.type == 'contentConsultancy') {
        this.$store.dispatch('updateContent', {type: 'consultancy', content: data.objects[0]})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'consultancy' ? '' : 'consultancy'
      this.$store.dispatch('updateExpanded', expanded)
    },
    toggleShowHelp() {
      this.$store.dispatch('updateShowHelp', this.showHelp ? false : true)
    },
    edit() {
      this.editing = true
      this.text = this.consultancy.text
    },
    addParagraph() {
      this.text.push('')
    },
    deleteParagraph(n) {
      const text = []
      for (let i = 0; i < this.text.length; i++) {
        if (i != n) {
          text.push(this.text[i])
        }
      }
      this.text = text
    },
    save() {
      let i = 0
      const paras = []
      while (document.getElementById('paragraph-' + i)) {
        paras.push(document.getElementById('paragraph-' + i).value)
        i++
      }
      const data = {
        type: 'contentConsultancy',
        id: this.consultancy.id,
        text: paras
      }
      bus.emit('sendUpdate', data)
      this.editing = false
    }
  }
}
</script>

<style lang="scss">
p {
  text-align: left;
}
textarea {
  width: 100%;
}
.paragraphs {
  td {
    border: none !important;
  }
}
</style>
