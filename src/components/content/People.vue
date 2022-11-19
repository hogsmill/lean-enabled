<template>
  <div class="people">
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
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    people() {
      return this.$store.getters.getPeople
    }
  },
  created() {

    bus.emit('sendLoad', 'person')

    bus.on('load', (data) => {
      if (data.type == 'person') {
        this.$store.dispatch('updatePeople', data.objects)
      }
    })
  },
  methods: {
    contact(person) {
      this.$store.dispatch('updateCurrentPerson', person)
      this.$store.dispatch('showModal', 'contact-person')
    }
  }
}
</script>

<style lang="scss">
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
    background-image: url("../../assets/img/people/anil-pic.webp");
  }

  .anil-endorsements {
    background-image: url("../../assets/img/people/anil-endorsements.webp");
  }

  .nick-pic {
    background-image: url("../../assets/img/people/nick-pic.webp");
  }

  .nick-endorsements {
    background-image: url("../../assets/img/people/nick-endorsements.webp");
  }
}
@media screen and (max-width: 768px) {
}
</style>
