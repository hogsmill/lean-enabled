<template>
  <div>
    <Header />
    <Quotes />
    <div class="content">

      <NextCourse v-if="showNextCourse()" />

      <!-- Transformation -->
      <TransformationMain v-if="tab == 'transformation'" />

      <!-- Rotating Comments in here -->

      <Transformation v-if="tab == 'transformation'" />
      <HowItWorks v-if="tab == 'transformation'" />
      <Comments v-if="tab == 'transformation'" :scope="'stakeholder'" />

      <!-- Apprentices (Training) -->
      <Apprentices v-if="tab == 'apprentices'" />

      <Course v-if="tab == 'course'" />

      <!-- About -->
      <About v-if="tab == 'about'" />

      <!-- FAQs  -->
      <Faqs v-if="tab == 'faqs'" />

      <!-- Others -->
      <CaseStudy v-if="tab == 'case-study'" />
      <Admin v-if="tab == 'admin'" />
      <TandCs v-if="tab == 'tandcs'" />
      <Security v-if="tab == 'security'" />
      <Modals />

      <!-- Footer -->
      <Endorsements v-if="tab !='admin'" />
      <Footer v-if="!mobile && tab !='admin'" />
    </div>
  </div>
</template>

<script>
import bus from './socket.js'

import localStorage from './lib/localStorage.js'
import params from './lib/params.js'

import Header from './components/Header.vue'
import Quotes from './components/Quotes.vue'
import NextCourse from './components/NextCourse.vue'
import TransformationMain from './components/content/TransformationMain.vue'
import Transformation from './components/Transformation.vue'
import HowItWorks from './components/content/HowItWorks.vue'
import Apprentices from './components/Apprentices.vue'
import Comments from './components/content/Comments.vue'
import Course from './components/Course.vue'
import About from './components/About.vue'
import Faqs from './components/FAQs.vue'
import CaseStudy from './components/CaseStudy.vue'
import Admin from './components/Admin.vue'
import TandCs from './components/footer/TandCs.vue'
import Security from './components/footer/Security.vue'
import Modals from './components/Modals.vue'
import Endorsements from './components/Endorsements.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Quotes,
    NextCourse,
    Transformation,
    TransformationMain,
    HowItWorks,
    Apprentices,
    Course,
    Comments,
    About,
    Faqs,
    CaseStudy,
    Admin,
    TandCs,
    Security,
    Modals,
    Endorsements,
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

.tab-link {
  font-weight: bold;

  &:hover {
    text-decoration: underline
  }
}

.yellow {
  background-color: #E7B81C;
}

.green {
  background-color: #33878B;
}

.black {
  background-color: #2E2E2E;
}

.master-black {
  background-color: #000;
}
</style>
