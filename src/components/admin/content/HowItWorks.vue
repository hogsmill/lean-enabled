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
              Text
              <span class="edit-hint" v-if="editing">
                (<i>Use "[text]" for links to site pages</i>)
              </span>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span v-if="!editing">
                <div class="left" v-for="(t, tindex) in howItWorks.text" :key="tindex">
                  <h4 v-if="t.type == 'header'">
                    {{ t.text }}
                  </h4>
                  <p v-if="t.type == 'text'">
                    {{ t.text }}
                  </p>
                </div>
              </span>
              <span v-if="editing">
                <table class="paragraphs">
                  <tr v-for="(t, tindex) in howItWorks.text" :key="tindex">
                    <td :class="{'heading': t.type == 'header'}">
                      <textarea :id="'paragraph-' + tindex" :value="t.text" />
                    </td>
                    <td>
                      <i class="fas fa-times" title="Delete this paragraph" @click="deleteParagraph(tindex)" />
                    </td>
                  </tr>
                </table>
                <button class="btn btn-primary smaller-font" @click="addHeading()">
                  Add New Heading
                </button>
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
    howItWorks() {
      return this.$store.getters.getContentHowItWorks
    }
  },
  created() {

    bus.emit('sendLoad', 'howItWorks')

    bus.on('load', (data) => {
      if (data.type == 'howItWorks') {
        this.$store.dispatch('updateContent', {type: 'howItWorks', content: data.objects[0]})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'how-it-works' ? '' : 'how-it-works'
      this.$store.dispatch('updateExpanded', expanded)
    },
    edit() {
      this.editing = true
      this.text = this.howItWorks.text
    },
    addHeading() {
      this.text.push({
        type: 'header',
        text: ''
      })
    },
    addParagraph() {
      this.text.push({
        type: 'text',
        text: ''
      })
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
        const element = document.getElementById('paragraph-' + i)
        paras.push({
          type: this.text[i].type,
          text: element.value
        })
        i++
      }
      console.log(paras)
      const data = {
        type: 'howItWorks',
        id: this.howItWorks.id,
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

    &.heading {
      font-weight: bold;
      font-size: large;
    }
  }
}
</style>
