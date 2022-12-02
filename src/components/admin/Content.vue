<template>
  <div>
    <Mission />
    <Transformation />
    <Consultancy />
    <Training />
    <ApprenticesIntro />
    <Services />
    <ServicesIntro />
    <CoursesIntro />
    <CaseStudy />
    <HowItWorks />
    <Carousel />
  </div>
</template>

<script>
import bus from '../../socket.js'

import Mission from './content/Mission.vue'
import Transformation from './content/Transformation.vue'
import Consultancy from './content/Consultancy.vue'
import Training from './content/Training.vue'
import ApprenticesIntro from './content/ApprenticesIntro.vue'
import Services from './content/Services.vue'
import ServicesIntro from './content/ServicesIntro.vue'
import CoursesIntro from './content/CoursesIntro.vue'
import CaseStudy from './content/CaseStudy.vue'
import HowItWorks from './content/HowItWorks.vue'
import Carousel from './content/Carousel.vue'

export default {
  components: {
    Mission,
    Transformation,
    Consultancy,
    Training,
    ApprenticesIntro,
    Services,
    ServicesIntro,
    CoursesIntro,
    CaseStudy,
    HowItWorks,
    Carousel
  },
  computed: {
    expanded() {
      return this.$store.getters.getExpanded
    }
  },
}
</script>
