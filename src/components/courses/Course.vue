<template>
  <div class="course" :class="course.belt">
    <div class="logo" :class="course.logo" @click="courseDescription()" />
    <h3 @click="courseDescription()">
      {{ course.name }}
    </h3>
    <p>
      {{ course.courseType }}
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
    'course',
    'detail'
  ],
  methods: {
    courseDescription(course) {
      this.$store.dispatch('updateCurrentCourse', this.course)
      this.$store.dispatch('updateTab', 'course')
    }
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
    text-align: center;
  }

  .belt {
    text-transform: uppercase;
    font-weight: bold;
  }

  .logo {
    margin: 20px auto;
    height: 50px;
    width: 50px;
    background-size: cover;
    background-repeat: no-repeat;

    &:hover {
      cursor: pointer;
    }

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
