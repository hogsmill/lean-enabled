<template>
  <div class="row">
    <div class="why">
      <h2>
        {{ why.header }}
      </h2>
      <p>
        {{ why.intro }}
      </p>
      <ol>
        <li v-for="(bullet, index) in why.bullets" :key="index">
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
    why() {
      return this.$store.getters.getContentWhy
    }
  },
  created() {
    bus.emit('sendLoad', 'contentWhy')

    bus.on('load', (data) => {
      if (data.type == 'contentWhy') {
        this.$store.dispatch('updateContent', {type: 'why', content: data.objects[0]})
      }
    })
  }
}
</script>

<style lang="scss">
.why {
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
