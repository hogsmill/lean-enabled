<template>
  <div>
    <h3>
      How It Works
      <i v-if="expanded != 'how-it-works'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'how-it-works'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
    </h3>
    <div v-if="expanded == 'how-it-works'">
      <table>
        <thead>
          <tr>
            <th>
              Building Block
            </th>
            <th>
              Text
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(block, index) in howItWorks" :key="index">
            <td>
              <span v-if="editing.id != block.id">
                {{ block.header }}
              </span>
              <input type="text" id="editing-header" v-if="editing.id == block.id" :value="block.header">
            </td>
            <td>
              <table v-if="editing.id != block.id" class="paragraphs">
                <tr v-for="(t, tindex) in block.text" :key="tindex">
                  <td class="left">
                    {{ t }}
                  </td>
                  <td />
                </tr>
              </table>
              <table v-if="editing.id == block.id" class="paragraphs">
                <tr v-for="(t, tindex) in text" :key="tindex">
                  <td class="left">
                    <textarea :id="'paragraph-' + tindex" :value="t" />
                  </td>
                  <td>
                    <i class="fas fa-times" title="Delete this paragraph" @click="deleteParagraph(tindex)" />
                  </td>
                </tr>
              </table>
              <span v-if="editing.id == block.id">
                <button class="btn btn-primary smaller-font" @click="addParagraph()">
                  Add New Paragraph
                </button>
              </span>
            </td>
            <td>
              <i class="far fa-edit" title="Edit" @click="edit(block)" />
              <i class="far fa-save" title="Save" :class="{'disabled': !editing}" @click="save(block)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import bus from '../../../socket.js'

export default {
  data() {
    return {
      editing: {},
      text: []
    }
  },
  computed: {
    expanded() {
      return this.$store.getters.getExpanded
    },
    howItWorks() {
      return this.$store.getters.getContentHowItWorks
    }
  },
  created() {

    bus.emit('sendLoad', 'howItWorks')

    bus.on('load', (data) => {
      if (data.type == 'howItWorks') {
        this.$store.dispatch('updateContent', {type: 'howItWorks', content: data.objects})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'how-it-works' ? '' : 'how-it-works'
      this.$store.dispatch('updateExpanded', expanded)
    },
    edit(block) {
      this.editing = block
      this.text = block.text
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
      const paras = []
      for (let i = 0; i < this.text.length; i++) {
        const element = document.getElementById('paragraph-' + i)
        paras.push(element.value)
      }
      const data = this.editing
      delete data._id
      data.header = document.getElementById('editing-header').value
      data.type = 'howItWorks',
      data.text = paras

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

    &.heading {
      font-weight: bold;
      font-size: large;
    }
  }
}
</style>
