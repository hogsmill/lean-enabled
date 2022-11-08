<template>
  <div class="apprentices">
    <div class="container-fluid text-center">
      <div class="new-content">
        Apprentices Content Here
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.apprentices {
  background-image: url("../assets/img/GettyImages-855597368.jpeg");
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
