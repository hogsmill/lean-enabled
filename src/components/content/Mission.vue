<template>
  <div class="mission">
    <h2>
      Our Mission
    </h2>
    <h3>
      <i class="fas fa-quote-left" />
      {{ mission.text }}
      <i class="fas fa-quote-right" />
    </h3>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    mission() {
      return this.$store.getters.getContentMission
    }
  },
  created() {

    bus.emit('sendLoad', 'mission')

    bus.on('load', (data) => {
      if (data.type == 'mission') {
        this.$store.dispatch('updateContent', {type: 'mission', content: data.objects[0]})
      }
    })
  }
}
</script>

<style lang="scss">
.mission {

  h3 {
    letter-spacing: 2px;
    color: #204893;
    font-style: italic;
    margin: 12px;
  }

  i.fa {
    color: #aaa;

    &.fa-quote-left {
      position: relative;
      top: -12px;
    }
  }
}

@media screen and (max-width: 768px) {
}
</style>
