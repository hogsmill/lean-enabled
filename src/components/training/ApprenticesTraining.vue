<template>
  <div class="row slideanim apprentices">
    <div v-for="(course, index) in courses" :key="index" class="col-sm-3">
      <Course :course="course" />
    </div>
  </div>
</template>

<script>
//import bus from '../socket.js'

import Course from '../courses/Course.vue'

export default {
  components: {
    Course
  },
  computed: {
    courses() {
      return this.$store.getters.getCourses
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.apprentices {
  background-image: url("../../assets/img/GettyImages-855597368.jpeg");
  background-size: cover;

  .new-content {
    background-color: #fff;
    opacity: 0.6;
    color: #444;
    font-size: 48px;
    font-weight: bold;
    width: 600px;
    margin: 200px auto;
  }

  h4 {
    &:hover {
      color: #337ab7;
      text-decoration: underline;
    }
  }
}

@media screen and (max-width: 768px) {
}
</style>
