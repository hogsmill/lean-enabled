<template>
  <div class="about">
    About
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.about {
}

@media screen and (max-width: 768px) {
}
</style>
