<template>
  <div class="row how-it-works">
    <h2 @click="setTab('how-it-works')" :class="scope">
      How It Works
    </h2>
    <div class="pic">
      <i v-if="scope == 'short'" :class="{'disabled': step < 1}" class="fas fa-chevron-left" @click="previousStep()" />
      <img v-if="howItWorks" :src="require(`../../assets/img/building-blocks/${howItWorks[step].image}`)">
      <i v-if="scope == 'short'" :class="{'disabled': step > textLength - 2}" class="fas fa-chevron-right" @click="nextStep()" />
    </div>
    <div class="text">
      <span v-for="(block, index) in howItWorks" :key="index">
        <h3 v-if="showText(index)">
          {{ block.header }}
        </h3>
        <span v-if="showText(index)">
          <p v-for="(para, pindex) in block.text" :key="pindex">
            {{ para }}
          </p>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  props: [
    'scope'
  ],
  data() {
    return {
      step: 0,
      textLength: 7
    }
  },
  computed: {
    howItWorks() {
      return this.$store.getters.getContentHowItWorks
    }
  },
  created() {

    bus.emit('sendLoad', 'howItWorks')

    bus.on('load', (data) => {
      if (data.type == 'howItWorks') {
        this.$store.dispatch('updateContent', {type: 'howItWorks', content: data.objects})
      }
    })
  },
  methods: {
    showText(index) {
      return this.scope == 'full' || index == this.step
    },
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    },
    previousStep() {
      if (this.step) {
        this.step = this.step - 1
      }
    },
    nextStep() {
      if (this.step < this.textLength - 1) {
        this.step = this.step + 1
      }
    }
  }
}
</script>

<style lang="scss">
.how-it-works {
  margin: 0 auto;
  background-color: #204893;

  h2, h3, p {
    color: #fff;
  }

  h3, p {
    text-align: left;
  }

  h2.short {
    &:hover {
      text-decoration: underline;
    }
  }

  .pic {
    width: 56%;
    height: 400px;
    margin: 0 auto;

    img {
      //height: 400px;
      width: 80%;
    }
    .fas {
      color: #fff;
      position: relative;
      top: 46%;
      font-size: xxx-large;

      &.fa-chevron-left {
        float: left;
      }

      &.fa-chevron-right {
        float: right;
      }

      &.disabled {
        color: #aaa;
        opacity: 0.5;
      }

    }
  }

  .text {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
