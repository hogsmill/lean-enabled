<template>
  <div class="row you-tube">
    <iframe
      class="you-tube-video"
      :src="youTube.url"
      title="Embedding an improvement system for better productivity and experience"
      frameborder="0"
      allow="accelerometer;
      autoplay;
      clipboard-write;
      encrypted-media;
      gyroscope;
      picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    youTube() {
      return this.$store.getters.getContentYouTube
    }
  },
  created() {
    bus.emit('sendLoad', 'contentYouTube')

    bus.on('load', (data) => {
      if (data.type == 'contentYouTube') {
        this.$store.dispatch('updateContent', {type: 'youTube', content: data.objects[0]})
      }
    })
  }
}
</script>

<style lang="scss">
.you-tube {
  background-color: #4A83C2;
  padding: 24px;

  .you-tube-video {
    max-width: 800px;
    width: 80%;
    height: 530px;
    border-radius: 20px;
  }
}
</style>
