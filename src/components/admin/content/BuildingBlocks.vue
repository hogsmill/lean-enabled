<template>
  <div>
    <h3>
      Building Blocks
      <i v-if="expanded != 'building-blocks'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'building-blocks'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'building-blocks'" class="fas fa-question-circle" @click="toggleShowHelp()" />
    </h3>
    <div v-if="expanded == 'building-blocks'">
      <Help v-if="showHelp" />
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
          <tr v-for="(block, index) in buildingBlocks" :key="index">
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

import Help from './Help.vue'

export default {
  components: {
    Help
  },
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
    showHelp() {
      return this.$store.getters.getShowHelp
    },
    buildingBlocks() {
      return this.$store.getters.getContentBuildingBlocks
    }
  },
  created() {

    bus.emit('sendLoad', 'buildingBlocks')

    bus.on('load', (data) => {
      if (data.type == 'buildingBlocks') {
        this.$store.dispatch('updateContent', {type: 'buildingBlocks', content: data.objects})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'building-blocks' ? '' : 'building-blocks'
      this.$store.dispatch('updateExpanded', expanded)
    },
    toggleShowHelp() {
      this.$store.dispatch('updateShowHelp', this.showHelp ? false : true)
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
      data.type = 'buildingBlocks',
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
