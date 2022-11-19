<template>
  <div class="container-fluid text-center about-us">
    <div class="row slideanim">
      <div class="col-sm-4">
        <Mission />
      </div>
      <div class="col-sm-8">
        <People />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import Mission from './content/Mission.vue'
import People from './content/People.vue'

export default {
  components: {
    Mission,
    People
  }
}
</script>

<style lang="scss">

.about-us {

  hr {
    border-color: #204893;
    max-width: 800px;
  }


}

@media screen and (max-width: 768px) {
}
</style>
