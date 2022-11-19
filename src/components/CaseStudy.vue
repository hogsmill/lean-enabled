<template>
  <div class="case-study">
    <h2>
      {{ caseStudy.header }}
    </h2>
    <p class="intro">
      {{ caseStudy.intro }}
    </p>
    <div class="hero" />
    <div v-for="(text, index) in caseStudy.text" :key="index">
      <h3 v-if="text.type == 'header'">
        {{ text.text }}
      </h3>
      <p v-if="text.type == 'text'">
        {{ text.text }}
      </p>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  computed: {
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
  }
}
</script>

<style lang="scss">
.case-study {
  max-width: 800px;
  margin: 0 auto;

  .hero {
    width: 100%;
    height: 400px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0 32px;
    background-image: url("../assets/img/caseStudy/case-study.png");
  }

  .intro {
    font-size: large;
    font-weight: bold;
  }

  h3, p {
    text-align: left;
  }
}
</style>
