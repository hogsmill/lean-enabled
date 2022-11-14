<template>
  <div class="container-fluid text-center about-us">
    <div class="row slideanim">
      <div class="col-sm-4 mission">
        <div id="missionDiv">
          <h2>
            Our Mission
          </h2>
          <h3>
            <i class="fas fa-quote-left" />
            {{ mission }}
            <i class="fas fa-quote-right" />
          </h3>
        </div>
      </div>
      <div class="col-sm-8">
        <h2>
          Who We Are
        </h2>
        <hr>
        <div v-for="(pers, index) in people" :key="index">
          <table class="person">
            <tr>
              <td>
                <h3 class="person-name" @click="contact(pers)">
                  {{ pers.name }}
                </h3>
                <div class="pic" :class="pers.pic" @click="contact(pers)" />
                <h3>
                  {{ pers.role }}
                </h3>
              </td>
              <td>
                <p v-for="(para, pindex) in pers.text" :key="pindex">
                  {{ para }}
                </p>
                <div class="endorsements" :class="pers.endorsements" />
              </td>
            </tr>
          </table>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  computed: {
    mission() {
      return this.$store.getters.getMission
    },
    people() {
      return this.$store.getters.getPeople
    },
    person() {
      return this.$store.getters.getCurrentPerson
    }
  },
  methods: {
    contact(person) {
      console.log(person)
      this.$store.dispatch('updateCurrentPerson', person)
      this.$store.dispatch('showModal', 'contact-person')
    }
  }
}
</script>

<style lang="scss">

.about-us {

  .mission {

    #missionDiv {

      h3 {
        letter-spacing: 4px;
        color: #204893;
        font-style: italic;
        margin: 12px;
      }

      i.fa {
        color: #aaa;

        &.fa-quote-left {
          position: relative;
          top: -12px;
        }
      }
    }
  }

  hr {
    border-color: #204893;
    max-width: 800px;
  }

  .person {
    margin: 0 auto;
    max-width: 800px;

    .person-name {

      &:hover {
        text-decoration: underline;
      }
    }

    td {
      padding: 12px;
      vertical-align: top;
    }

    p {
      text-align: left;
    }

    .pic {
      width: 200px;
      height: 200px;
      background-size: contain;
      background-repeat: no-repeat;
      margin: 32px;
    }

    .endorsements {
      width: 100%;
      height: 100px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin: 32px;
    }

    .anil-pic {
      background-image: url("../assets/img/anil-pic.webp");
    }

    .anil-endorsements {
      background-image: url("../assets/img/anil-endorsements.webp");
    }

    .nick-pic {
      background-image: url("../assets/img/nick-pic.webp");
    }

    .nick-endorsements {
      background-image: url("../assets/img/nick-endorsements.webp");
    }
  }
}

@media screen and (max-width: 768px) {
}
</style>
