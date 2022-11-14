<template>
  <div class="leaders">
    <div class="container-fluid text-center">
      <div class="new-content">
        <h2>
          Transformation through
        </h2>
        <ul>
          <li>
            Reduction of waste through lean thinking
          </li>
          <li>
            Increased efficiency through flow management
          </li>
          <li>
            Continual improvement through rapid feedback and learning
          </li>
        </ul>
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
.leaders {
  background-image: url("../assets/img/GettyImages-855597368.jpeg");
  background-size: cover;

  .new-content {
    font-size: 24px;
    text-align: left;
    background-color: #fff;
    opacity: 0.6;
    color: #444;
    font-weight: bold;
    width: 800px;
    margin: 50px auto;
    padding: 24px;
  }

  li {
  }
}

@media screen and (max-width: 768px) {
}
</style>
