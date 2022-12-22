<template>
  <nav class="nav">
    <div v-if="mobile" class="hamburger">
      <i class="fas fa-hamburger" @click="toggleMenu()" />
    </div>
    <div class="logo" @click="setTab('transformation')" />
    <div class="nav-bar">
      <ul :class="{ 'hide': mobile && menuHidden }">
        <li v-if="canLogin && session && (admin || siteAdmin)" :class="{'active': tab == 'admin'}" @click="setTab('admin')">
          Admin
        </li>
        <li :class="{'active': tab == 'transformation'}" @click="setTab('transformation')">
          {{ header.Transformation }}
        </li>
        <li :class="{'active': tab == 'apprentices'}" @click="setUrl('apprentices')">
          {{ header.Apprenticeships }}
        </li>
        <li :class="{'active': tab == 'about'}" @click="setUrl('about')">
          {{ header.About }}
        </li>
        <li :class="{'active': tab == 'blog' || tab.match(/^blog: /)}" @click="setUrl('blog')">
          {{ header.Blog }}
        </li>
        <li :class="{'active': tab == 'contact'}" @click="show('contact')">
          {{ header.Contact }}
        </li>
        <li v-if="canLogin && !mobile && !session" class="login" @click="show('login')">
          <i class="fas fa-sign-in-alt" title="Login" />
        </li>
        <li v-if="canLogin && !mobile && session" class="logout" @click="logout()">
          <i v-if="!admin" class="far fa-handshake" :title="'Logout ' + userName" />
          <i v-if="admin" class="fas fa-handshake" :title="'Logout ' + userName + ' (Admin)'" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import bus from '../socket.js'

import domFuns from '../lib/dom.js'
import params from '../lib/params.js'
import mailFuns from '../lib/mail.js'

export default {
  computed: {
    site() {
      return this.$store.getters.getSite
    },
    emails() {
      return this.$store.getters.getEmailAddresses
    },
    mobile() {
      return this.$store.getters.getMobile
    },
    menuHidden() {
      return this.$store.getters.getMenuHidden
    },
    header() {
      return this.$store.getters.getHeader
    },
    tab() {
      return this.$store.getters.getTab
    },
    session() {
      return this.$store.getters.getSession
    },
    userName() {
      return this.$store.getters.getUserName
    },
    canLogin() {
      return this.$store.getters.getCanLogin
    },
    admin() {
      return this.$store.getters.getAdmin
    },
    siteAdmin() {
      return this.$store.getters.getSiteAdmin
    }
  },
  created() {
    const self = this

    console.log('here', this.mobile, window.innerWidth)
    this.setTabFromParams()

    const session = localStorage.getItem('session-lean-enabled')
    if (session) {
      this.$store.dispatch('updateSession', session)
      bus.emit('sendCheckLogin', {session: session})
    } else {
      this.clearLogin()
    }

    bus.emit('sendLoad', 'header')

    bus.on('load', (data) => {
      if (data.type == 'header') {
        this.$store.dispatch('updateHeader', data.objects[0])
      }
    })

    bus.on('showContact', () => {
      self.show('feedback')
    })

    bus.on('loginSuccess', (data) => {
      if (data.session == this.session) {
        this.checking = false
        this.$store.dispatch('hideModal', 'login')
        this.$store.dispatch('updateLogin', data)
        localStorage.setItem('session-lean-enabled', data.session)
      }
    })

    bus.on('loginError', (data) => {
      if (data.id == this.id) {
        this.checking = false
        this.$store.dispatch('hideModal', 'login')
        alert(data.message)
      }
    })

    bus.on('logout', (data) => {
      if (data.session == this.session) {
        this.clearLogin()
      }
    })
  },
  methods: {
    setTabFromParams() {
      const tabs = [
        'transformation',
        'apprentices',
        'about',
        'blog'
      ]
      for (let i = 0; i < tabs.length; i++) {
        if (params.isParam(tabs[i])) {
          this.setTab(tabs[i])
        }
      }
    },
    clearLogin() {
      this.$store.dispatch('updateSession', '')
      localStorage.removeItem('session-lean-enabled')
    },
    toggleMenu() {
      const hidden = !this.menuHidden
      this.$store.dispatch('updateMenuHidden', hidden)
    },
    show(modal) {
      this.$store.dispatch('showModal', modal)
    },
    forgotten() {
      this.hide('login')
      this.show('forgotten')
    },
    setTab(tab) {
      domFuns.setTab(this.$store, tab)
    },
    setUrl(tab) {
      if (window.location.href.match(/\?.*=/)) {
        window.location.href = window.location.origin + '?' + tab
      }
      domFuns.setTab(this.$store, tab)
    },
    sendContact() {
      mailFuns.post({
        action: 'Contact from Agile Simulations',
        email: encodeURIComponent(document.getElementById('email').value),
        comments: encodeURIComponent(document.getElementById('comments').value),
        tomail: this.emails,
        fromsite: this.site
        },
        'Thanks for your interest - we\'ll get back to you soon!'
      )
      this.hide()
    },
    logout() {
      localStorage.removeItem('session-lean-enabled')
      bus.emit('sendLogout', {session: this.session})
    }
  },
}
</script>

<style lang="scss">
.nav {
  background-color: #DAD8DB;
  padding: 0 12px;
  position: fixed;
  width: 100%;
  z-index: 10;

  .logo {
    background-image: url("../assets/img/logo.webp");
    background-repeat: no-repeat;
    min-height: 180px;
    width: 235px;
    float: left;

    &:hover {
      cursor: pointer;
    }
  }

  .nav-bar {
    border: 0;
    font-size: 16px !important;
    line-height: 1.42857143 !important;
    letter-spacing: 2px;
    border-radius: 0;
    font-family: Montserrat, sans-serif;

    ul {
      float: right;
      margin-top: 50px;
      margin-bottom: 0;

      &.hide {
        height: 0;
      }

      li {
        display: inline-block;
        list-style-type: none;
        padding: 15px 13px;
        color: #204893 !important;
        font-size: x-large;

        &.login, &.logout {
          padding: 7px 7px 14px 7px;
        }

        .fas, .far {
          position: relative;
          top: 3px;
          font-size: x-large;
          color: #fff;
        }

        &:hover {
          opacity: 0.9;

          .fas, .far {
            color: #f4511e;
          }
        }

        &:hover, &.active  {
          font-weight: bold;
          background-color: #eee;
        }
      }
    }
  }
}

.feedback {
  .fa-times {
    margin: 6px;
  }

  h4 {
    letter-spacing: initial;
    text-align: center;
    font-size: xx-large;
  }

  .feedback {
    letter-spacing: 0;
    color: #212529;
  }

  p.feedback-form {
    margin-bottom: 12px;
  }

  .feedback-form {
    width: 80%;
    margin: 0 auto;

    table {
      margin: 0 auto;

      td {
        padding: 6px;

        &.forgotten {
          text-align: right;
        }

        &.login-button {
          text-align: center;

          span {
            color: #fff;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .nav {
    height: 80px;
    font-size: large;

    .logo {
      background-image: url("../assets/img/logo-small.png");
      background-repeat: no-repeat;
      background-size: contain;
      height: 50px;
      width: 50px;
      position: absolute;
      top: 2px;
    }

    .nav-bar {
      ul {
        margin-top: 0;
      }
    }
  }
}

@media screen and (max-width: 860px) {
  nav {
    .hamburger {
      height: 42px;

      .fa-hamburger {
        color: #204893;
        font-size: 32px;
        margin: 4px 0 0 0;
        float: none;
      }
    }

    .nav-bar {
      &.hide {
        display: none;
      }

      ul {
        position: absolute;
        top: 40px;
        background-color: #DAD8DB;

        li {
          width: 100%;
          padding: 8px 13px !important;
        }
      }
    }
  }
}
</style>
