<template>
  <div class="endorsement-logos">
    <div v-for="(n, index) in 6" :key="index" class="endorsement-logo" :class="getClass(n)" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logos: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
      ]
    }
  },
  created() {
    this.cycle(1)
  },
  methods: {
    getClass(n) {
      return 'logo-' + this.logos[n]
    },
    cycle(n) {
      const logos = []
      for (let i = 0; i < 12; i++) {
        const l = i + n
        if (l <= 12) {
          logos.push(l)
        } else {
          logos.push(l - 12)
        }
      }
      this.logos = logos
      n = n > 11 ? 1 : n + 1
      window.setTimeout(() => {
        this.cycle(n)
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
.endorsement-logo {
  height: 80px;
  width: 160px;
  margin: 6px 24px;
  border: solid 1px solid;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  &.logo-1 {
    background-image: url("../assets/img/logos/1.png");
  }
  &.logo-2 {
    background-image: url("../assets/img/logos/2.png");
  }
  &.logo-3 {
    background-image: url("../assets/img/logos/3.png");
  }
  &.logo-4 {
    background-image: url("../assets/img/logos/4.png");
  }
  &.logo-5 {
    background-image: url("../assets/img/logos/5.png");
  }
  &.logo-6 {
    background-image: url("../assets/img/logos/6.png");
  }
  &.logo-7 {
    background-image: url("../assets/img/logos/7.png");
  }
  &.logo-8 {
    background-image: url("../assets/img/logos/8.png");
  }
  &.logo-9 {
    background-image: url("../assets/img/logos/9.png");
  }
  &.logo-10 {
    background-image: url("../assets/img/logos/10.png");
  }
  &.logo-11 {
    background-image: url("../assets/img/logos/11.png");
  }
  &.logo-12 {
    background-image: url("../assets/img/logos/12.png");
  }
}
</style>
