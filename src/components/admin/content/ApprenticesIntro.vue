<template>
  <div>
    <h3>
      Apprentices Intro
      <i v-if="expanded != 'apprentices-intro'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'apprentices-intro'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
    </h3>
    <div v-if="expanded == 'apprentices-intro'">
      <table>
        <thead>
          <tr>
            <th>
              User Type
            </th>
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
          <tr v-for="(userType, uindex) in users" :key="uindex">
            <td>
              {{ userType }}
            </td>
            <td>
              <span v-if="editing != userType">
                <p v-for="(t, tindex) in apprenticesIntro[userType].text" :key="tindex">
                  {{ t }}
                </p>
              </span>
              <span v-if="editing == userType">
                <table class="paragraphs">
                  <tr v-for="(t, tindex) in apprenticesIntro[userType].text" :key="tindex">
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
              <i class="far fa-edit" title="Edit" @click="edit(userType)" />
              <i class="far fa-save" title="Save" :class="{'disabled': !editing}" @click="save(userType)" />
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
      users: [
        'manager',
        'apprentice'
      ],
      editing: '',
      text: []
    }
  },
  computed: {
    expanded() {
      return this.$store.getters.getExpanded
    },
    apprenticesIntro() {
      return this.$store.getters.getContentApprenticesIntro
    }
  },
  created() {

    bus.emit('sendLoad', 'contentApprenticesIntro')

    bus.on('load', (data) => {
      if (data.type == 'contentApprenticesIntro') {
        this.$store.dispatch('updateContent', {type: 'apprenticesIntro', content: data.objects[0]})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'apprentices-intro' ? '' : 'apprentices-intro'
      this.$store.dispatch('updateExpanded', expanded)
    },
    edit(userType) {
      this.editing = userType
      this.text = this.apprenticesIntro[userType].text
    },
    addParagraph(userType) {
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
    save(userType) {
      let i = 0
      const paras = []
      while (document.getElementById('paragraph-' + i)) {
        paras.push(document.getElementById('paragraph-' + i).value)
        i++
      }
      const data = this.apprenticesIntro
      data.type = 'contentApprenticesIntro'
      data[userType].text = paras
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
