<template>
  <div class="row user-type">
    <div class="user-type-div">
      I am
      <table>
        <tr>
          <td>
            <input type="checkbox" :checked="userType == 'manager'" @click="setUserType('manager')">
          </td>
          <td>
            a <span :class="{'bold': userType == 'manager'}"> Manager</span> looking to check what courses are available
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" :checked="userType == 'apprentice'" @click="setUserType('apprentice')">
          </td>
          <td>
            an <span :class="{'bold': userType == 'apprentice'}">Apprentice</span> looking for course content
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    userType() {
      return this.$store.getters.getUserType
    }
  },
  methods: {
    setUserType(type) {
      this.$store.dispatch('updateUserType', type)
    }
  }
}
</script>

<style lang="scss">
  .user-type {
    background-image: url("../assets/img/GettyImages-855597368.jpeg");
    background-size: cover;

    .user-type-div {
      opacity: 0.8;
      background-color: #fff;
      margin: 24px auto;
      padding: 24px;
      display: inline-block;
      font-size: x-large;

      input {
        height: 24px;
        width: 24px;
        margin: 12px;
      }

      span {
        padding: 3px;

        &.bold {
          background-color: #A0B4CF;;
          color: #fff;
        }
      }
    }
  }
</style>
