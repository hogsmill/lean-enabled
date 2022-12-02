<template>
  <div class="safeguarding">
    <h2>
      Safeguarding
    </h2>
    <div class="team">
      <h3>
        Our Safeguarding team
      </h3>
      <div class="row">
        <div v-for="(person, index) in safeguardingTeam" :key="index" class="col-sm-4">
          <div class="safeguarding-person">
            <div class="pic" :class="person.pic" />
            <h4>
              {{ person.name }}
            </h4>
            <p>
              {{ person.role }}
            </p>
            <p>
              <i class="fas fa-envelope" /> {{ person.email }}
            </p>
            <p>
              <i class="fas fa-phone" /> {{ person.phone }}
            </p>
          </div>
        </div>
      </div>
      <hr class="line">
      <h3>
        Make every moment a chance to keep safe along with us
      </h3>
      <div class="row">
        <div class="col-sm-6">
          Office: 0203 907 7717
        </div>
        <div class="col-sm-6">
          Email:
          <a @click="show('contact')">
            safeguarding@lean-enabled-group.co.uk
          </a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <img :src="link('safe1.png')">
      </div>
      <div class="col-sm-6">
        <div class="extremism">
          <img :src="link('safe3.png')">
          <div>
            <h2>
              Do your part to help prevent extremism
            </h2>
            <p>
              If you have a concern about someone you think may have been exposed
              to violent extremism, please call us on 0203 907 7717.
            </p>
            <p>
              Alternatively, email us on
              <a @click="show('contact')">
                safeguarding@lean-enabled-group.co.uk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <h3>
      Please <a @click="contact()">Contact Us</a> for more information.
    </h3>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    safeguardingTeam() {
      return this.$store.getters.getSafeguardingTeam
    }
  },
  created() {

    bus.emit('sendLoad', 'safeguarding')

    bus.on('load', (data) => {
      if (data.type == 'safeguarding') {
        this.$store.dispatch('updateSafeguarding', data.objects)
      }
    })
  },
  methods: {
    contact() {
      bus.emit('contact', {})
    },
    show() {
      this.$store.dispatch('showModal', 'safeguarding')
    },
    link(file) {
      const root = location.hostname == 'agilesimulations.co.uk' ? '/lean-enabled' : ''
      return root + '/img/safeguarding/' + file
    }
  }
}
</script>

<style lang="scss">
  .safeguarding {
    padding: 12px;
    color: #888;

    .team {
      padding: 48px 12px 80px 12px;
    }

    h2 {
      text-align: center;

      i {
        color: #f4511e;
      }
    }

    hr {
      background-color: #204893;
      height: 3px;
    }
    .extremism {
      background-color: #cbeafb;
      margin-right: 12px;

      div {
        margin: 12px 48px;
        padding-bottom: 48px;

        h2 {
          font-weight: 900;
        }

        p {
          text-align: center;
          font-size: x-large;
        }
      }
    }

    .safeguarding-person {

      .pic {
        margin: 0 auto;
        height: 100px;
        width: 100px;
        background-size: contain;

        &.sarah {
          background-image: url("../../assets/img/safeguarding/sarah.png");
        }
        &.nick {
          background-image: url("../../assets/img/safeguarding/nick.png");
        }
        &.sara {
          background-image: url("../../assets/img/safeguarding/sara.png");
        }
      }

      p {
        text-align: center;
      }
    }
  }
</style>
