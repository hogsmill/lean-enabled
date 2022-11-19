<template>
  <div class="user-type">
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
    background-color: #fff;
    margin: 12px auto;
    width: 85%;
    padding: 24px;
    font-size: xx-large;

    span {
      padding: 3px;

      &.bold {
        background-color: #204893;
        color: #fff;
      }
    }
  }
</style>
