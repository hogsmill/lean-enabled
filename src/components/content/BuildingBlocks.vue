<template>
  <div class="row building-blocks">
    <h2 @click="setTab('building-blocks')" :class="scope">
      Building Blocks
    </h2>
    <div class="pic">
      <i v-if="scope == 'short'" :class="{'disabled': step < 1}" class="fas fa-chevron-left" @click="previousStep()" />
      <img v-if="buildingBlocks" :src="require(`../../assets/img/building-blocks/${buildingBlocks[step].image}`)">
      <i v-if="scope == 'short'" :class="{'disabled': step > textLength - 2}" class="fas fa-chevron-right" @click="nextStep()" />
    </div>
    <div class="text">
      <span v-for="(block, index) in buildingBlocks" :key="index">
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

import domFuns from '../../lib/dom.js'

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
    buildingBlocks() {
      return this.$store.getters.getContentBuildingBlocks
    }
  },
  created() {

    bus.emit('sendLoad', 'buildingBlocks')

    bus.on('load', (data) => {
      if (data.type == 'buildingBlocks') {
        this.$store.dispatch('updateContent', {type: 'buildingBlocks', content: data.objects})
      }
    })
  },
  methods: {
    showText(index) {
      return this.scope == 'full' || index == this.step
    },
    setTab(tab) {
      domFuns.setTab(this.$store, tab)
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
.building-blocks {
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
    margin: 0 auto;

    img {
      width: 80%;
    }
    .fas {
      color: #fff;
      font-size: xxx-large;
      display: contents;

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
