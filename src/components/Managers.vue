<template>
  <div class="managers">
    <div class="container-fluid text-center">
      <div class="row slideanim">
        <div class="col-sm-6">
          <div class="new-content">
            <h2>
              What We Do
            </h2>
            <p>
              Our vision is to build staff capability across the NHS and to be recognised
              as a 'Centre of Excellence' by applying NHS best practices with industry
              best practices.
            </p>
            <p>
              Our vision is to build staff capability across the NHS and to be recognised
              as a 'Centre of Excellence' by applying NHS best practices with industry
              best practices.
            </p>
            <p>
              Our vision is to build staff capability across the NHS and to be recognised
              as a 'Centre of Excellence' by applying NHS best practices with industry
              best practices.
            </p>
            <p>
              Our vision is to build staff capability across the NHS and to be recognised
              as a 'Centre of Excellence' by applying NHS best practices with industry
              best practices.
            </p>
          </div>
        </div>
        <div class="col-sm-6">
          <video class="video" controls>
            <source src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="row slideanim services">
        <h2>
          Our Services
        </h2>
      </div>
      <div class="row slideanim services">
        <div v-for="(service, index) in services" :key="index" class="col-sm-2 service-container">
          <div class="service">
            <h3>
              {{ service.name }}
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
      <div class="row slideanim white">
        <h1>
          Full Width Content
        </h1>
        <p>
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
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  computed: {
    services() {
      return this.$store.getters.getServices
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.managers {

  background-image: url("../assets/img/GettyImages-855597368.jpeg");
  background-size: cover;
  position: relative;

  .video {
    margin: 50px auto;
    width: 80%;
    background-color: #fff;
  }

  .new-content {
    background-color: #fff;
    opacity: 0.6;
    color: #444;
    width: 80%;
    margin: 50px auto;
    font-size: 24px;
  }

  .white {
    background-color: #fff;
    margin-top: 24px;
  }

  h4 {
    &:hover {
      color: #337ab7;
      text-decoration: underline;
    }
  }

  h2 {
    background-color: #fff;
    opacity: 0.8;
  }

  .services {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    opacity: 0.8;

    h2 {
      margin: 12px auto;
    }

    .service-container {
      display: flex;
      align-items: stretch;

      .service {

        h3 {
          background-color: #204893;
          height: 86px;
          margin-bottom: 0;
          color: #fff;
          padding: 3px;
        }

        p {
          background-color: #204893;
          color: #fff;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
}
</style>
