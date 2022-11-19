<template>
  <div class="managers">
    <div class="row slideanim ">
      <div class="col-sm-6">
        <div class="intro">
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
    <Services />
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
</template>

<script>

import Services from '../content/Services.vue'

export default {
  components: {
    Services
  }
}
</script>

<style lang="scss">
.managers {

  position: relative;

  .video {
    margin: 50px auto;
    width: 80%;
    background-color: #fff;
  }

  .intro {
    background-color: #fff;
    opacity: 0.6;
    color: #444;
    width: 80%;
    margin: 0 auto;
    font-size: 24px;
    padding: 12px;
  }

  .white {
    background-color: #fff;
    margin-top: 24px;
    padding: 12px;
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
}

@media screen and (max-width: 768px) {
}
</style>
