<template>
  <div>
    <Header />
    <Mission />
    <Transformation />
    <Consultancy />
    <Training />
    <ApprenticesIntro />
    <Services />
    <ServicesIntro />
    <CoursesIntro />
    <CaseStudy />
    <BuildingBlocks />
    <Carousel />
    <YouTube />
  </div>
</template>

<script>
import bus from '../../socket.js'

import Header from './content/Header.vue'
import Mission from './content/Mission.vue'
import Transformation from './content/Transformation.vue'
import Consultancy from './content/Consultancy.vue'
import Training from './content/Training.vue'
import ApprenticesIntro from './content/ApprenticesIntro.vue'
import Services from './content/Services.vue'
import ServicesIntro from './content/ServicesIntro.vue'
import CoursesIntro from './content/CoursesIntro.vue'
import CaseStudy from './content/CaseStudy.vue'
import BuildingBlocks from './content/BuildingBlocks.vue'
import Carousel from './content/Carousel.vue'
import YouTube from './content/YouTube.vue'

export default {
  components: {
    Header,
    Mission,
    Transformation,
    Consultancy,
    Training,
    ApprenticesIntro,
    Services,
    ServicesIntro,
    CoursesIntro,
    CaseStudy,
    BuildingBlocks,
    Carousel,
    YouTube
  },
  computed: {
    expanded() {
      return this.$store.getters.getExpanded
    }
  },
}
</script>
