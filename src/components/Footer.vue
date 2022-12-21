<template>
  <div class="footer">
    <h4 class="values" @click="setTab('values')">
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
      <div class="col-sm-2" />
      <div class="col-sm-2">
        <a @click="setTab('safeguarding')">Safeguarding</a>
      </div>
      <div class="col-sm-2">
        <a :href="root() + '/docs/policy.pdf'" target="blank">Training Policy</a>
      </div>
      <div class="col-sm-2">
        <a @click="setTab('faqs')">FAQs</a>
      </div>
      <div class="col-sm-2">
        <a @click="show()">Contact</a>
      </div>
      <div class="col-sm-2">
        <a href="https://www.linkedin.com/company/lean-enabled-group/" title="LinkedIn">
          <i class="fab fa-linkedin" />
        </a>
        <a href="https://youtu.be/KHDSo9vnUiA" title="You Tube">
          <i class="fab fa-youtube" />
        </a>
        <a href="https://twitter.com/kaizen_anil_mbb" title="Twitter">
          <i class="fab fa-twitter" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import domFuns from '../lib/dom.js'

export default {
  methods: {
    setTab(tab) {
      domFuns.setTab(this.$store, tab)
    },
    show() {
      this.$store.dispatch('showModal', 'contact')
    },
    root() {
      return domFuns.root()
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

    .values {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    span {
      padding: 0 24px;
      font-size: 18px;
    }

    .col-sm-2 {
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
