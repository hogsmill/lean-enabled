<template>
  <div>
    <h3>
      Services Intro
      <i v-if="expanded != 'service-intro'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'service-intro'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'service-intro'" class="fas fa-question-circle" @click="toggleShowHelp()" />
    </h3>
    <div v-if="expanded == 'service-intro'">
      <Help v-if="showHelp" />
      <table>
        <thead>
          <tr>
            <th>
              User Type
            </th>
            <th>
              Text
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
                <p v-for="(t, tindex) in servicesIntro[userType].text" :key="tindex">
                  {{ t }}
                </p>
              </span>
              <span v-if="editing == userType">
                <table class="paragraphs">
                  <tr v-for="(t, tindex) in servicesIntro[userType].text" :key="tindex">
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

import Help from './Help.vue'

export default {
  components: {
    Help
  },
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
    showHelp() {
      return this.$store.getters.getShowHelp
    },
    servicesIntro() {
      return this.$store.getters.getContentServicesIntro
    }
  },
  created() {

    bus.emit('sendLoad', 'contentServicesIntro')

    bus.on('load', (data) => {
      if (data.type == 'contentServicesIntro') {
        this.$store.dispatch('updateContent', {type: 'servicesIntro', content: data.objects[0]})
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'service-intro' ? '' : 'service-intro'
      this.$store.dispatch('updateExpanded', expanded)
    },
    toggleShowHelp() {
      this.$store.dispatch('updateShowHelp', this.showHelp ? false : true)
    },
    edit(userType) {
      this.editing = userType
      this.text = this.servicesIntro[userType].text
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
      const data = this.servicesIntro
      delete data._id
      data.type = 'contentServicesIntro'
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
