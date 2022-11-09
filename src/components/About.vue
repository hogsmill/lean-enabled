<template>
  <div>
    <h2>
      Who We Are
    </h2>
    <hr>
    <div v-for="(person, index) in people" :key="index">
      <table class="person">
        <tr>
          <td>
            <h3>
              {{ person.name }}
            </h3>
            <div class="pic" :class="person.pic" />
            <h3>
              {{ person.role }}
            </h3>
          </td>
          <td>
            <p v-for="(para, pindex) in person.text" :key="pindex">
              {{ para }}
            </p>
            <div class="endorsements" :class="person.endorsements" />
          </td>
        </tr>
      </table>
      <hr>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  computed: {
    people() {
      return this.$store.getters.getPeople
    }
  }
}
</script>

<style lang="scss">
hr {
  border-color: #204893;
  max-width: 800px;
}

.person {
  margin: 0 auto;
  max-width: 800px;

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

@media screen and (max-width: 768px) {
}
</style>
