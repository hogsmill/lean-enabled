<template>
  <div class="row benefits-row">
    <div class="benefits">
      <h2>
        {{ benefits.header }}
      </h2>
      <p>
        {{ benefits.intro }}
      </p>
      <ol>
        <li v-for="(bullet, index) in benefits.bullets" :key="index">
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
    benefits() {
      return this.$store.getters.getContentBenefits
    }
  },
  created() {
    bus.emit('sendLoad', 'contentBenefits')

    bus.on('load', (data) => {
      if (data.type == 'contentBenefits') {
        this.$store.dispatch('updateContent', {type: 'benefits', content: data.objects[0]})
      }
    })
  }
}
</script>

<style lang="scss">
.benefits-row {

  .benefits {
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
}
</style>
