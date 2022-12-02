<template>
  <div class="row slideanim transformation">
    <div class="col-sm-6">
      <div class="slide">
        <i class="fas fa-hands-helping" />
        <h2>
          Consultancy Services
        </h2>
        <p v-for="(text, cindex) in consultancy.text" :key="cindex" v-html="parseText(text)" />
        <p>
          We provide the following services
        </p>
        <table>
          <tr v-for="(service, sindex) in services" :key="sindex">
            <td>
              <div class="bullet" :class="'service-' + parseInt(sindex + 1)" />
            </td>
            <td>
              {{ service.title }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="slide">
        <i class="fas fa-chalkboard-teacher" />
        <h2>
          Bespoke Training Services
        </h2>
        <p v-for="(text, tindex) in training.text" :key="tindex" v-html="parseText(text)" />
        <ul>
          <li v-for="(point, pindex) in training.points" :key="pindex">
            {{ point }}
          </li>
        </ul>
        <p>
          See a <span class="tab-link" tab="case-study">Case Study</span>
          for an example of throughput increase.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import textFuns from '../lib/text.js'

export default {
  computed: {
    consultancy() {
      return this.$store.getters.getContentConsultancy
    },
    services() {
      return this.$store.getters.getServices
    },
    training() {
      return this.$store.getters.getContentTraining
    }
  },
  created() {
    bus.emit('sendLoad', 'contentConsultancy')
    bus.emit('sendLoad', 'service')
    bus.emit('sendLoad', 'contentTraining')

    bus.on('load', (data) => {
      if (data.type == 'contentConsultancy') {
        this.$store.dispatch('updateContent', {type: 'consultancy', content: data.objects[0]})
      }
    })
    bus.on('load', (data) => {
      if (data.type == 'service') {
        this.$store.dispatch('updateServices', data.objects)
      }
    })
    bus.on('load', (data) => {
      if (data.type == 'contentTraining') {
      this.$store.dispatch('updateContent', {type: 'training', content: data.objects[0]})
      }
    })
  },
  updated() {
    const links = document.getElementsByClassName('tab-link')
    for (let i = 0; i < links.length; i++) {
      const tab = links[i].getAttribute('tab')
      links[i].addEventListener('click', () => {
        this.setTab(tab)
      })
    }
  },
  methods: {
    parseText(text) {
      return textFuns.parse(text)
    },
    setTab(tab) {
      if (this.mobile) {
        this.toggleMenu()
      }
      this.$store.dispatch('updateTab', tab)
    }
  }
}
</script>

<style lang="scss">
.transformation {
  background-image: url("../assets/img/GettyImages-855597368.jpeg");
  background-size: cover;

  .col-sm-6 {
    display: flex;
    align-items: stretch;

    .slide {
      margin: 24px;
      padding: 24px 12px;
      background-color: #fff;
      opacity: 0.9;

      .fas {
        color: #204893;
        font-size: xxx-large;
      }
    }
  }

  table {

    td {
      text-align: left;
      vertical-align: middle;
      padding: 6px;

      .bullet {
        height: 24px;
        width: 24px;
        background-size: cover;
      }

      .service-1 {
        background-image: url("../assets/img/services/service-1.webp");
      }
      .service-2 {
        background-image: url("../assets/img/services/service-2.webp");
      }
      .service-3 {
        background-image: url("../assets/img/services/service-3.webp");
      }
      .service-4 {
        background-image: url("../assets/img/services/service-4.webp");
      }
      .service-5 {
        background-image: url("../assets/img/services/service-5.webp");
      }
    }
  }

  li::marker {
      font-size: 12px;
    }
}

@media screen and (max-width: 768px) {
}
</style>
