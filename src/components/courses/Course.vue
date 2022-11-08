<template>
  <div class="course" :class="course.belt">
    <div class="logo" :class="course.logo" />
    <h3>
      {{ course.name }}
    </h3>
    <p>
      {{ course.type }}
    </p>
    <p>
      Level {{ course.level }}
    </p>
    <p v-if="course.leanSixSigma">
      Lean Six Sigma
    </p>
    <p class="belt">
      {{ course.belt }} belt
    </p>
  </div>
</template>

<script>
export default {
  props: [
    'course'
  ],
  methods: {
  }
}
</script>

<style lang="scss">
.course {
  margin: 24px 12px;
  padding: 12px;
  color: #fff;

  h3 {
    height: 60px;
  }
  
  h3, p {
    color: #fff;
  }

  .belt {
    text-transform: uppercase;
    font-weight: bold;
  }

  &.yellow {
    background-color: #E7B81C;
  }

  &.green {
    background-color: #33878B;
  }

  &.black {
    background-color: #2E2E2E;
  }

  &.master-black {
    background-color: #000;
  }

  .logo {
    margin: 20px auto;
    height: 50px;
    width: 50px;
    background-size: cover;
    background-repeat: no-repeat;

    &.technician {
      background-image: url("../../assets/img/technician.webp");
    }

    &.practitioner {
      background-image: url("../../assets/img/practitioner.webp");
    }

    &.coach {
      background-image: url("../../assets/img/coach.webp");
    }

    &.leader {
      background-image: url("../../assets/img/leader.webp");
    }
  }
}
</style>
