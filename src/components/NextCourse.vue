<template>
  <div class="next-course">
    Next course date here
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  data() {
    return {
      popular1: null,
      popular2: null,
      popular3: null,
    }
  },
  created() {
    bus.emit('sendLoadGames')

    bus.on('loadGames', (data) => {
      this.popular1 = data.find((g) => {
        return g.popular == 1
      })
      this.popular2 = data.find((g) => {
        return g.popular == 2
      })
      this.popular3 = data.find((g) => {
        return g.popular == 3
      })
    })
  },
}
</script>


<style lang="scss">
  .next-course {
    
  }
</style>
