<template>
  <div class="row slideanim services">
    <div v-for="(service, index) in services" :key="index" class="col-sm-2 service-container">
      <div class="service">
        <div class="pic" :class="picClass(service)" />
        <h3>
          {{ service.title }}
        </h3>
        <p>
          {{ service.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    services() {
      return this.$store.getters.getServices
    }
  },
  created() {
    bus.emit('sendLoad', 'service')

    bus.on('load', (data) => {
      if (data.type == 'service') {
        this.$store.dispatch('updateServices', data.objects)
      }
    })
  },
  methods: {
    picClass(service) {
      return 'pic-' + service.title.replace(/[\s:]/g, '-').toLowerCase()
    }
  }
}
</script>

<style lang="scss">
.services {
  background-image: url("../../assets/img/GettyImages-855597368.jpeg");
  background-size: cover;

  h2 {
    margin: 15px auto;
  }

  .service-container {
    display: flex;
    align-items: stretch;
    margin-bottom: 15px;
    margin-top: 15px;

    .service {

      background-color: #204893;

      .pic {
        height: 40px;
        background-size: cover;
        background-color: #fff;

        &.face-to-face-and-online-training {
          background-image: url("../../assets/img/services/1-1-and-group-coaching.jpeg");
        }
        &.pic-1-1-and-group-coaching {
          background-image: url("../../assets/img/services/1-1-and-group-coaching.jpeg");
        }
        &.nhs-case-studies {
          background-image: url("../../assets/img/services/1-1-and-group-coaching.jpeg");
        }
        &.nhs-themed-simulations {
          background-image: url("../../assets/img/services/1-1-and-group-coaching.jpeg");
        }
        &.group-problem-solving {
          background-image: url("../../assets/img/services/1-1-and-group-coaching.jpeg");
        }
        &.guest-speakers {
          background-image: url("../../assets/img/services/1-1-and-group-coaching.jpeg");
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
