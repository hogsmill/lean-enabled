<template>
  <div class="footer">
    <h4>
      Living By Our Values
      <br>
      <span>
        TRUST
      </span>
      <span>
        RESPECT
      </span>
      <span>
        INTEGRITY
      </span>
      <span>
        PEOPLE FOCUSSED
      </span>
    </h4>
    <div class="row">
      <div class="col-sm-6">
        <a @click="setTab('tandcs')">T&Cs and Privacy</a>
      </div>
      <div class="col-sm-2">
        <a @click="setTab('security')">Security</a>
      </div>

      <!-- Safeguarding -->

      <!-- POLICY FROM EXISTING SITE -->

      <div class="col-sm-2">
        <a @click="contact()">Contact</a>
      </div>
      <div class="col-sm-2">
        <a href="https://www.linkedin.com/company/lean-enabled-group/" title="LinkedIn">
          <i class="fab fa-linkedin" />
        </a>
        <a href="https://youtu.be/KHDSo9vnUiA" title="You Tube">
          <i class="fab fa-youtube" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  methods: {
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    },
    contact() {
      bus.emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .footer {
    padding: 30px;
    background-color: #204893;
    background-image: url("../assets/img/LEG_white_bob.webp");
    background-repeat: no-repeat;
    background-size: 50px 75px;
    background-position-y: center;
    background-position-x: 22px;

    h4, span {
      text-align: center;
      color: #fff;
    }

    span {
      padding: 0 24px;
      font-size: 18px;
    }


    .col-sm-2, .col-sm-6 {
      text-align: center;
      vertical-align: middle;

      a {
        margin: 0 auto;
        color: #fff;
      }

      .fab {
        color: #fff;
        margin: 0 12px;
        font-size: xxx-large
      }
    }
  }
</style>
