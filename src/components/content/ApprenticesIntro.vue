<template>
  <div class="row slideanim apprenticeships">
    <h2>
      Apprenticeship Training
    </h2>
    <span v-if="contentApprenticesIntro[userType]">
      <p v-for="(para, index) in contentApprenticesIntro[userType].text" :key="index" v-html="parseText(para)" />
    </span>
    <Factors v-if="userType == 'manager'" />
  </div>
</template>

<script>
import bus from '../../socket.js'

import textFuns from '../../lib/text.js'
import domFuns from '../../lib/dom.js'

import Factors from './Factors.vue'

export default {
  components: {
    Factors
  },
  props: [
    'userType'
  ],
  computed: {
    contentApprenticesIntro() {
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
  updated() {
    domFuns.addLinkEvents(this.$store)
  },
  methods: {
    setTab(tab) {
      domFuns.setTab(this.$store, tab)
    },
    parseText(text) {
      return textFuns.parse(text)
    },
  }
}
</script>

<style lang="scss">
.apprenticeships {
  background-color: #fff;
  opacity: 0.8;

  h2 {
    margin: 15px auto;
  }

  p {
    margin: 24px;
  }

  p:first-of-type {
    font-size: large;
  }
}

@media screen and (max-width: 768px) {
}
</style>
