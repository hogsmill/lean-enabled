<template>
  <div class="row slideanim transformation-main">
    <div class="col-sm-8">
      <div class="main-para">
        <p v-for="(para, index) in transformation.text" :key="index">
          {{ para }}
        </p>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="main-pic" />
      <div class="quote">
        <span class="quote-text">{{ transformation.quote.text }}</span>
        -
        {{ transformation.quote.author }}
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    transformation() {
      return this.$store.getters.getContentTransformation
    }
  },
  created() {

    bus.emit('sendLoad', 'transformation')

    bus.on('load', (data) => {
      if (data.type == 'transformation') {
        this.$store.dispatch('updateContent', {type: 'transformation', content: data.objects[0]})
      }
    })
  }
}
</script>

<style lang="scss">
.transformation-main {
  .main-para {
    text-align: left;
    font-size: large;
    background-color: #fff;
    max-width: 80%;
    margin: 24px auto;
    padding: 12px;

    p:first-of-type {
      font-size: xx-large;
      color: #204893;
    }
  }

  .main-pic {
    background-image: url("../../assets/img/jeremy-hunt.jpeg");
    background-size: cover;
    height: 200px;
    border: 1px solid;
    margin: 24px 32px 12px 0;
  }

  .quote {
    margin-bottom: 12px;
    padding-right: 34px;
    text-align: right;

    .quote-text {
      font-style: italic;
      font-weight: bold;
    }
  }
}
</style>
