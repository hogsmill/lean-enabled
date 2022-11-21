<template>
  <div class="row slideanim transformation">
    <div class="col-sm-6">
      <div class="slide">
        <i class="fas fa-hands-helping" />
        <h2>
          Consultancy Services
        </h2>
        <p v-for="(text, cindex) in consultancy.text" :key="cindex" v-html="parseText(text)" />
      </div>
    </div>
    <div class="col-sm-6">
      <div class="slide">
        <i class="fas fa-chalkboard-teacher" />
        <h2>
          Training Services
        </h2>
        <p v-for="(text, tindex) in training.text" :key="tindex" v-html="parseText(text)" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import textFuns from '../lib/text.js'

export default {
  computed: {
    consultancy() {
      return this.$store.getters.getContentConsultancy
    },
    training() {
      return this.$store.getters.getContentTraining
    }
  },
  created() {
    bus.emit('sendLoad', 'contentConsultancy')
    bus.emit('sendLoad', 'contentTraining')

    bus.on('load', (data) => {
      if (data.type == 'contentConsultancy') {
        this.$store.dispatch('updateContent', {type: 'consultancy', content: data.objects[0]})
      }
    })
    bus.on('load', (data) => {
      if (data.type == 'contentTraining') {
      this.$store.dispatch('updateContent', {type: 'training', content: data.objects[0]})
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
    parseText(text) {
      return textFuns.parse(text)
    },
    setTab(tab) {
      if (this.mobile) {
        this.toggleMenu()
      }
      this.$store.dispatch('updateTab', tab)
    },
  }
}
</script>

<style lang="scss">
.transformation {
  background-image: url("../assets/img/GettyImages-855597368.jpeg");
  background-size: cover;

  .col-sm-6 {
    display: flex;
    align-items: stretch;

    .slide {
      margin: 24px;
      padding: 24px 12px;
      background-color: #fff;
      opacity: 0.9;

      .fas {
        color: #204893;
        font-size: xxx-large;
      }
    }
  }

  .new-content {
    font-size: 24px;
    text-align: left;
    background-color: #fff;
    opacity: 0.6;
    color: #444;
    font-weight: bold;
    width: 800px;
    margin: 50px auto;
    padding: 24px;
  }

  li {
  }
}

@media screen and (max-width: 768px) {
}
</style>
