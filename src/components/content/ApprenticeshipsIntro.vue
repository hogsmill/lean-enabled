<template>
  <div v-if="contentApprenticesIntro['intro']" class="row slideanim apprenticeships">
    <div class="col-sm-5">
      <p v-for="(para, index) in contentApprenticesIntro['intro'].text" :key="index" v-html="parseText(para)" />
    </div>
    <div class="col-sm-7">
      <img :src="require(`../../assets/img/apprentice.png`)" />
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

import textFuns from '../../lib/text.js'
import domFuns from '../../lib/dom.js'

export default {
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
    root() {
      return domFuns.root()
    }
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
    font-size: xx-large;
    color: #204893;
  }

  img {
    width: 100%;
    margin: 12px;
  }
}

@media screen and (max-width: 768px) {
}
</style>
