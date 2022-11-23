<template>
  <div class="course-detail">
    <p>
      <video v-if="course.video" id="video" controls>
        <source :src="root + '/video/L' + course.level + '.mov'" type="video/mp4">
      </video>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </p>
  </div>
</template>

<script>
export default {
  props: [
    'course'
  ],
  computed: {
    root() {
      return this.$store.getters.getRoot
    }
  },
}
</script>

<style lang="scss">
.course-detail {

  #video {
    float: right;
    width: 200px;
    height: 400px;
  }
  p {
    color: #444;
    text-align: left;
  }
}
</style>
