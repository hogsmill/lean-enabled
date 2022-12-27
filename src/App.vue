<template>
  <div>
    <Header />
    <Quotes />
    <div class="content">

      <NextCourse v-if="showNextCourse()" />

      <!-- Transformation -->
      <TransformationMain v-if="tab == 'transformation'" />
      <Podcast v-if="tab == 'transformation'" />
      <YouTube v-if="tab == 'transformation'" />

      <Carousel v-if="tab == 'transformation'" :carousel="'transformation'" />
      <Transformation v-if="tab == 'transformation'" />
      <BuildingBlocks v-if="tab == 'transformation'" :scope="'short'" />
      <Comments v-if="tab == 'transformation'" :scope="'stakeholder'" />

      <!-- Apprentices (Training) -->
      <Apprentices v-if="tab == 'apprentices'" />

      <Reasons v-if="tab == 'ten-reasons'" />
      <Why v-if="tab == 'why'" />

      <Course v-if="tab == 'course'" />

      <!-- About -->
      <About v-if="tab == 'about'" />

      <!-- Blog  -->
      <Blog v-if="tab == 'blog' || tab.match(/^blog: /)" />

      <!-- FAQs  -->
      <Faqs v-if="tab == 'faqs'" />

      <!-- Others -->
      <BuildingBlocks v-if="tab == 'how-it-works'" :scope="'full'" />
      <CaseStudy v-if="tab == 'case-study'" />
      <Admin v-if="tab == 'admin'" />
      <Values v-if="tab == 'values'" />
      <Safeguarding v-if="tab == 'safeguarding'" />
      <Modals />

      <!-- Footer -->
      <Endorsements v-if="tab !='admin'" />
      <Footer v-if="tab !='admin'" />
    </div>
  </div>
</template>

<script>
import bus from './socket.js'

import localStorage from './lib/localStorage.js'
import params from './lib/params.js'
import router from './lib/router.js'

import Header from './components/Header.vue'
import Quotes from './components/Quotes.vue'
import NextCourse from './components/NextCourse.vue'
import TransformationMain from './components/content/TransformationMain.vue'
import Podcast from './components/content/Podcast.vue'
import YouTube from './components/content/YouTube.vue'
import Transformation from './components/Transformation.vue'
import Carousel from './components/content/Carousel.vue'
import BuildingBlocks from './components/content/BuildingBlocks.vue'
import Apprentices from './components/Apprentices.vue'
import Comments from './components/content/Comments.vue'
import Course from './components/Course.vue'
import Reasons from './components/content/Reasons.vue'
import Why from './components/content/Why.vue'
import About from './components/About.vue'
import Faqs from './components/FAQs.vue'
import Blog from './components/Blog.vue'
import CaseStudy from './components/CaseStudy.vue'
import Admin from './components/Admin.vue'
import Safeguarding from './components/footer/Safeguarding.vue'
import Values from './components/footer/Values.vue'
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
    Podcast,
    Carousel,
    TransformationMain,
    YouTube,
    BuildingBlocks,
    Apprentices,
    Course,
    Reasons,
    Why,
    Comments,
    About,
    Faqs,
    Blog,
    CaseStudy,
    Admin,
    Safeguarding,
    Values,
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

    this.$store.dispatch('updateMobile', window.innerWidth < 768)

    bus.emit('sendCreateAdminUsers')

    router.init(this.$store)
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
