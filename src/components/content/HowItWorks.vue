<template>
  <div class="row how-it-works">
    <h2>
      How It Works
    </h2>
    <div class="pic" />
    <div class="text">
      <span v-for="(text, index) in howItWorks.text" :key="index">
        <h3 v-if="text.type == 'header'">
          {{ text.text }}
        </h3>
        <p v-if="text.type == 'text'">
          {{ text.text }}
        </p>
      </span>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    howItWorks() {
      return this.$store.getters.getContentHowItWorks
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
.how-it-works {
  margin: 0 auto;
  background-color: #204893;

  h2, h3, p {
    color: #fff;
    text-align: left;
  }

  .pic {
    width: 100%;
    height: 400px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("../../assets/img/how-it-works.png");
  }

  .text {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
