<template>
  <div class="course-modules" v-if="course.modules.length">
    <h4>
      Modules
    </h4>
    <p v-for="(module, index) in course.modules" :key="index">
      M{{ module.number }} - {{ module.name }}
    </p>
  </div>
</template>

<script>
export default {
  props: [
    'course'
  ]
}
</script>

<style lang="scss">
.course-modules {
  background-color: #A0B4CF;
  padding: 12px;

  p {
    color: #fff;
    font-weight: bold;
  }
}
</style>
