<template>
  <div class="row slideanim training">
    <h2>
      Apprentice Training
    </h2>
    <span v-if="contentApprenticesIntro[userType]">
      <p v-for="(para, index) in contentApprenticesIntro[userType].text" :key="index">
        {{ para }}
      </p>
    </span>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
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
