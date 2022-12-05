<template>
  <div class="row reasons-row">
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
.reasons-row {
  background-image: url("../../assets/img/jeremy-hunt.jpeg");
  background-size: cover;

  .reasons {
    border: 1px solid;
    margin: 48px auto;
    background-color: #204893;
    padding: 24px;
    max-width: 964px;

    h2, p, b, li {
      color: #fff !important;
    }

    li {
      margin-bottom: 12px;
    }
  }
}
</style>
