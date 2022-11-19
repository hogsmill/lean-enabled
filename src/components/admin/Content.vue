<template>
  <div>
    <Mission />
    <Consultancy />
    <Training />
    <Services />
    <CaseStudy />
  </div>
</template>

<script>
import bus from '../../socket.js'

import Mission from './content/Mission.vue'
import Consultancy from './content/Consultancy.vue'
import Training from './content/Training.vue'
import Services from './content/Services.vue'
import CaseStudy from './content/CaseStudy.vue'

export default {
  components: {
    Mission,
    Consultancy,
    Training,
    Services,
    CaseStudy
  },
  computed: {
    expanded() {
      return this.$store.getters.getExpanded
    }
  },
}
</script>
