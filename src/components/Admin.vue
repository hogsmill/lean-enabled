<template>
  <div class="admin">
    <h2>
      Admin for {{ userName }}
    </h2>
    <div class="tabs">
      <div :class="{'active': tab == 'users'}" @click="setTab('users')">
        Users
      </div>
      <div :class="{'active': tab == 'emails'}" @click="setTab('emails')">
        Emails
      </div>
      <div :class="{'active': tab == 'other'}" @click="setTab('other')">
        Other
      </div>
    </div>
    <div class="details">
      <Users v-if="tab == 'users'" />
      <Emails v-if="tab == 'emails'" />
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import Users from './admin/Users.vue'
import Emails from './admin/Emails.vue'

export default {
  components: {
    Users,
    Emails
  },
  data() {
    return {
      tab: 'users'
    }
  },
  computed: {
    userName() {
      return this.$store.getters.getUserName
    }
  },
  created() {
    bus.emit('sendLoadUsers')

    bus.on('loadUsers', (data) => {
      this.users = data
    })
  },
  methods: {
    setTab(tab) {
      this.tab = tab
    }
  }
}
</script>

<style lang="scss">
.admin {
  max-width: 850px;
  margin: 100px auto;

  h2 {
    text-align: center;
  }

  .far, .fas {
    margin: 3px;

    &:hover {
      cursor: pointer;
    }

    &.disabled {
      color: #aaa;

      &:hover {
        cursor: default;
      }
    }
  }

  .tabs {
    border-bottom: 1px solid #204893;

    div {
      display: inline-block;
      width: 100px;
      border-bottom: 1px solid #204893;
      background-color: #fff;
      position: relative;
      top: 1px;

      &.active {
        font-weight: bold;
        border: 1px solid #204893;
        border-bottom: 1px solid #fff;
      }
    }
  }
  .details {
    margin: 0 24px;

    table {
      margin: 0 auto;
      width: 100%;

      th, td {
        border: 1px solid;
        padding: 6px;
      }

      th {
        text-align: center;
      }

      td {
        &.center {
          text-align: center;
        }
      }
    }
  }
}
</style>
