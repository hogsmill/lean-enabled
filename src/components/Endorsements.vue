<template>
  <div>
    <h4>
      We have helped the following organisations
    </h4>
    <div class="slider">
      <ul>
        <li v-for="(n, index) in 12" :key="index">
          <div class="endorsement-logo" :class="'logo-' + n" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">

.slider {
  width: 2160px;
  margin: auto;
  overflow: visible;

  ul {
    display: flex;
    padding: 0;
    animation: cambio 150s infinite linear;

    li {
      padding:0 10px;
      list-style: none;
      border: 1px solid #ddd;
      padding: 6px;
      margin: 0 6px;

      div {
        height: 80px;
        width: 160px;
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
    }
  }
}

@keyframes cambio {
  from {margin-left: 0%}
  to {margin-left: -100%}
}

</style>
