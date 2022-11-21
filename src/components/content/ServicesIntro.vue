<template>
  <div class="row slideanim services-intro">
    <h2>
      Our Services
    </h2>
    <span v-if="contentServicesIntro[userType]">
      <p v-for="(para, index) in contentServicesIntro[userType].text" :key="index">
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
    contentServicesIntro() {
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
  }
}
</script>

<style lang="scss">
.services-intro {
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
