<template>
  <div>
    <h3>
      Case Study
      <i v-if="expanded != 'case-study'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'case-study'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
    </h3>
    <div v-if="expanded == 'case-study'">
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
                <div class="left" v-for="(t, tindex) in caseStudy.text" :key="tindex">
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
                  <tr v-for="(t, tindex) in caseStudy.text" :key="tindex">
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
    caseStudy() {
      return this.$store.getters.getContentCaseStudy
    }
  },
  created() {

    bus.emit('sendLoad', 'caseStudy')

    bus.on('load', (data) => {
      if (data.type == 'caseStudy') {
        this.$store.dispatch('updateContent', {type: 'caseStudy', content: data.objects[0]})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'case-study' ? '' : 'case-study'
      this.$store.dispatch('updateExpanded', expanded)
    },
    edit() {
      this.editing = true
      this.text = this.caseStudy.text
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
        type: 'caseStudy',
        id: this.caseStudy.id,
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
