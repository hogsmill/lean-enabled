<template>
  <div class="row">
    <div class="factors">
      <h2>
        {{ factors.header }}
      </h2>
      <p>
        {{ factors.intro }}
      </p>
      <ol>
        <li v-for="(bullet, index) in factors.bullets" :key="index">
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
    factors() {
      return this.$store.getters.getContentFactors
    }
  },
  created() {
    bus.emit('sendLoad', 'contentFactors')

    bus.on('load', (data) => {
      if (data.type == 'contentFactors') {
        this.$store.dispatch('updateContent', {type: 'factors', content: data.objects[0]})
      }
    })
  }
}
</script>

<style lang="scss">
.factors {
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
