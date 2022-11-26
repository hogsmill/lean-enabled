<template>
  <div class="row slideanim techniques">
    <div v-for="(technique, index) in techniques" :key="index" class="col-sm-2 technique-container">
      <div class="technique">
        <div class="pic" :class="picClass(technique)" />
        <h3>
          {{ technique.title }}
        </h3>
        <p>
          {{ technique.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    techniques() {
      return this.$store.getters.getTechniques
    }
  },
  created() {
    bus.emit('sendLoad', 'technique')

    bus.on('load', (data) => {
      if (data.type == 'technique') {
        this.$store.dispatch('updateTechniques', data.objects)
      }
    })
  },
  methods: {
    picClass(technique) {
      return 'pic-' + technique.title.replace(/[\s:]/g, '-').toLowerCase()
    }
  }
}
</script>

<style lang="scss">
.techniques {
  background-image: url("../../assets/img/GettyImages-855597368.jpeg");
  background-size: cover;

  h2 {
    margin: 15px auto;
  }

  .technique-container {
    display: flex;
    align-items: stretch;
    margin-bottom: 15px;
    margin-top: 15px;

    .technique {
      width: 100%;
      background-color: #204893;

      .pic {
        height: 80px;
        background-size: cover;
        background-position: center;
        background-color: #fff;

        &.pic-face-to-face-and-online-training {
          background-image: url("../../assets/img/techniques/face-to-face-and-online-training.jpeg");
        }
        &.pic-1-1-and-group-coaching {
          background-image: url("../../assets/img/techniques/1-1-and-group-coaching.webp");
        }
        &.pic-nhs-case-studies {
          background-image: url("../../assets/img/techniques/nhs-case-studies.jpeg");
        }
        &.pic-nhs-themed-simulations {
          background-image: url("../../assets/img/techniques/nhs-themed-simulations.webp");
        }
        &.pic-group-problem-solving {
          background-image: url("../../assets/img/techniques/group-problem-solving.webp");
        }
        &.pic-guest-speakers {
          background-image: url("../../assets/img/techniques/guest-speakers.jpeg");
        }
      }

      h3 {
        height: 86px;
        margin-bottom: 0;
        color: #fff;
        padding: 3px;
      }

      p {
        background-color: #204893;
        color: #fff;
        padding: 12px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
}
</style>
