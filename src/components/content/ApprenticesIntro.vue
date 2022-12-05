<template>
  <div class="row slideanim training">
    <h2>
      Apprenticeship Training
    </h2>
    <span v-if="contentApprenticesIntro[userType]">
      <p v-for="(para, index) in contentApprenticesIntro[userType].text" :key="index" v-html="parseText(para)" />
    </span>
    <Factors v-if="userType == 'manager'" />
    <Why v-if="userType == 'manager'" />
  </div>
</template>

<script>
import bus from '../../socket.js'

import textFuns from '../../lib/text.js'

import Factors from './Factors.vue'
import Why from './Why.vue'

export default {
  components: {
    Factors,
    Why
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
    const links = document.getElementsByClassName('tab-link')
    for (let i = 0; i < links.length; i++) {
      const tab = links[i].getAttribute('tab')
      links[i].addEventListener('click', () => {
        this.setTab(tab)
      })
    }
  },
  methods: {
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    },
    parseText(text) {
      return textFuns.parse(text)
    },
  }
}
</script>

<style lang="scss">
.training {
  background-color: #fff;
  opacity: 0.8;

  h2 {
    margin: 15px auto;
  }

  p {
    margin: 24px;
  }
}

@media screen and (max-width: 768px) {
}
</style>
