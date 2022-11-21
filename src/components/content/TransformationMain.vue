<template>
  <div class="row slideanim transformation-main">
    <div class="col-sm-8">
      <div class="main-para">
        {{ transformation.text }}
      </div>
    </div>
    <div class="col-sm-4">
      <div class="main-pic" />
      <div class="quote">
        <i>"These guys are great"</i> - Jeremy Hunt
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
  }
}
</style>
