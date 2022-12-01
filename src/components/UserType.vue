<template>
  <div class="row user-type">
    <div class="user-type-div">
      <div>
        I am (<i>click to select</i>)
      </div>
      <div class="input-div" :class="{'selected': userType == 'manager'}" @click="setUserType('manager')">
        <i v-if="userType != 'manager'" class="fas fa-check" />
        <i v-if="userType == 'manager'" class="fas fa-times" />
        a Manager looking to check what courses are available
      </div>
      <div class="input-div" :class="{'selected': userType == 'apprentice'}" @click="setUserType('apprentice')">
        <i v-if="userType != 'apprentice'" class="fas fa-check" />
        <i v-if="userType == 'apprentice'" class="fas fa-times" />
        an Apprentice looking for course content
      </div>
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

      .input-div {
        color: #204893;
        border: 1px solid #204893;
        display: inline-block;
        margin: 6px;
        padding: 6px;
        border-radius: 12px;

        &.selected {
          background-color: #204893;
          color: #fff;
        }

        .fas {
          margin: 0 3px;

          &.fa-check {
            color: green;
          }
          &.fa-times {
            color: red;
          }
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
  }
</style>
