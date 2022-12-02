<template>
  <div class="row">
    <div class="reasons">
      <h2>
        {{ reasons.header }}
      </h2>
      <p>
        {{ reasons.intro }}
      </p>
      <ol>
        <li v-for="(bullet, index) in reasons.bullets" :key="index">
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
    reasons() {
      return this.$store.getters.getContentReasons
    }
  },
  created() {
    bus.emit('sendLoad', 'contentReasons')

    bus.on('load', (data) => {
      if (data.type == 'contentReasons') {
        this.$store.dispatch('updateContent', {type: 'reasons', content: data.objects[0]})
      }
    })
  }
}
</script>

<style lang="scss">
.reasons {
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
}
</style>
