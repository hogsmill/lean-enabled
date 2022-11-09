<template>
  <div>
    <Header />
    <div class="content">
      <NextCourse v-if="showNextCourse()" />
      <Leaders v-if="tab == 'transformation'" />
      <Managers v-if="tab == 'managers'" />
      <Apprentices v-if="tab == 'apprentices'" />
      <About v-if="tab == 'about'" />
      <Faqs v-if="tab == 'faqs'" />

      <Admin v-if="tab == 'admin'" />

      <TandCs v-if="tab == 'tandcs'" />
      <Security v-if="tab == 'security'" />
      <Modals />
      <Footer v-if="!mobile" />
    </div>
  </div>
</template>

<script>
import bus from './socket.js'

import localStorage from './lib/localStorage.js'
import params from './lib/params.js'

import Header from './components/Header.vue'
import NextCourse from './components/NextCourse.vue'
import Leaders from './components/Leaders.vue'
import Managers from './components/Managers.vue'
import Apprentices from './components/Apprentices.vue'
import About from './components/About.vue'
import Faqs from './components/FAQs.vue'
import Admin from './components/Admin.vue'

/*
import SiteAdmin from './components/SiteAdmin.vue'
*/

import TandCs from './components/footer/TandCs.vue'
import Security from './components/footer/Security.vue'
import Modals from './components/Modals.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    NextCourse,
    Leaders,
    Managers,
    Apprentices,
    About,
    Faqs,
    Admin,
    /*
    SiteAdmin,
    */
    TandCs,
    Security,
    Modals,
    Footer
  },
  data() {
    return {
      selectedTab: '',
      windowWidth: 0
    }
  },
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    },
    tab() {
      return this.$store.getters.getTab
    }
  },
  created() {

    this.$store.dispatch('updateCanLogin', params.isParam('host') || params.isParam('admin'))

    this.$store.dispatch('updateMobile', window.outerWidth < 768)

    bus.emit('sendCreateAdminUser')
  },
  methods: {
    showNextCourse() {
      return this.tab == 'managers' || this.tab == 'apprentices'
    }
  }
}
</script>

<style lang="scss">

@font-face {
  font-family: "Lato";
  src: local("Lato"),
   url(./assets/fonts/lato/Lato-Regular.ttf) format("truetype");
}

* {
  font-family: Lato, Helvetica, Arial, sans-serif;
  color: #444;
}
body, p {
  font-weight: 400;
  font-size: 15px;
  line-height: 1.8;
}
h2 {
  font-size: 36px;
  margin-bottom: 30px !important;
  color: #666;
}
h4 {
  font-size: 24px;
  line-height: 1.375em;
  font-weight: 400;
  margin-bottom: 30px;
  color: #666;
}
b, strong {
  color: #444!important;
}
.section-icon {
  font-size: 50px;
  color: #f4511e;
  margin: 10px auto;
}
.fa-rss-square {
  color: #ee802f !important;
}
</style>
