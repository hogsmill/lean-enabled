<template>
  <div class="row">
    <div class="problem-solving">
      <h2>
        {{ problemSolving.header }}
      </h2>
      <p>
        {{ problemSolving.intro }}
      </p>
      <ol>
        <li v-for="(bullet, index) in problemSolving.bullets" :key="index">
          <b>
            {{ bullet.header }}.
          </b>
          {{ bullet.text }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    problemSolving() {
      return this.$store.getters.getContentProblemSolving
    }
  },
  created() {
    bus.emit('sendLoad', 'contentProblemSolving')

    bus.on('load', (data) => {
      if (data.type == 'contentProblemSolving') {
        this.$store.dispatch('updateContent', {type: 'problemSolving', content: data.objects[0]})
      }
    })
  }
}
</script>

<style lang="scss">
.problem-solving {
  background-color: #204893;
  margin: 12px auto;
  padding: 24px;
  max-width: 964px;

  h2, p, b, li {
    color: #fff !important;
  }

  li {
    margin-bottom: 12px;
  }
}</style>
