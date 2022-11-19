<template>
  <div class="services">
    <div class="row slideanim services">
      <h2>
        Our Services
      </h2>
      <p v-for="(text, sindex) in contentServices.text" :key="sindex">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    contentServices() {
      return this.$store.getters.getContentServices
    }
  },
  created() {
    bus.emit('sendLoad', 'contentServices')

    bus.on('load', (data) => {
      if (data.type == 'contentServices') {
        this.$store.dispatch('updateContent', {type: 'services', content: data.objects[0]})
      }
    })
  }
}
</script>

<style lang="scss">
.services {
  background-color: #fff;
  opacity: 0.8;
  margin: 15px;

  h2 {
    margin: 12px auto;
  }
}

@media screen and (max-width: 768px) {
}
</style>
