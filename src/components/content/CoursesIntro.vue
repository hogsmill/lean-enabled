<template>
  <div class="row slideanim training">
    <h2>
      Our Training
    </h2>
    <span v-if="contentCoursesIntro[userType]">
      <p v-for="(para, index) in contentCoursesIntro[userType].text" :key="index">
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
    contentCoursesIntro() {
      return this.$store.getters.getContentCoursesIntro
    }
  },
  created() {
    bus.emit('sendLoad', 'contentCoursesIntro')

    bus.on('load', (data) => {
      if (data.type == 'contentCoursesIntro') {
        this.$store.dispatch('updateContent', {type: 'coursesIntro', content: data.objects[0]})
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
