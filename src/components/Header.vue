<template>
  <nav class="nav">
    <div v-if="mobile" class="hamburger">
      <i class="fas fa-hamburger" @click="toggleMenu()" />
    </div>
    <div class="logo" />
    <div class="nav-bar">
      <ul :class="{ 'hide': mobile && hideMenu }">
        <li v-if="canLogin && session && (admin || siteAdmin)" :class="{'active': tab == 'admin'}" @click="setTab('admin')">
          Admin
        </li>
        <li :class="{'active': tab == 'transformation'}" @click="setTab('transformation')">
          Leaders
        </li>
        <li :class="{'active': tab == 'managers'}" @click="setTab('managers')">
          Managers
        </li>
        <li :class="{'active': tab == 'apprentices'}" @click="setUrl('apprentices')">
          Apprentices
        </li>
        <li :class="{'active': tab == 'about'}" @click="setUrl('about')">
          About
        </li>
        <li :class="{'active': tab == 'faqs'}" @click="setUrl('faqs')">
          FAQs
        </li>
        <li :class="{'active': tab == 'contact'}" @click="show('contact')">
          Contact
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

    <div id="feedback-mobile" class="feedback-mobile" v-if="mobileContact">
      <div class="float-right mr-2 mt-1">
        <button type="button" class="close" @click="hide" aria-label="Close">
          <i class="fas fa-times" />
        </button>
      </div>
      <div class="mt-4">
        <p class="feedback-form">
          Thanks for visiting Agile Simulations; please let us know what you would like
          to know, or tell us, in the comments box below
        </p>
        <div class="feedback-form">
          <input type="text" id="email" class="form-control" placeholder="Email (optional)">
          <br>
          <textarea id="comments" rows="6" class="form-control" placeholder="Your comments" />
          <br>
          <button class="btn btn-primary smaller-font" @click="sendContact()">
            Send
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import bus from '../socket.js'

import params from '../lib/params.js'
import mailFuns from '../lib/mail.js'

export default {
  data() {
    return {
      mobileContact: false,
      hideMenu: true
    }
  },
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

    this.setTabFromParams()

    const session = localStorage.getItem('session-lean-enabled')
    if (session) {
      this.$store.dispatch('updateSession', session)
      bus.emit('sendCheckLogin', {session: session})
    } else {
      this.clearLogin()
    }

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
        'managers',
        'apprentices',
        'about'
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
      this.hideMenu = !this.hideMenu
      this.hide()
    },
    show(modal) {
      if (this.mobile) {
        this.mobileContact = !this.mobileContact
        window.scrollTo(0, 0)
      } else {
        this.$store.dispatch('showModal', modal)
      }
    },
    hide(modal) {
      if (this.mobile) {
        this.mobileContact = false
      }
    },
    forgotten() {
      this.hide('login')
      this.show('forgotten')
    },
    setTab(tab) {
      if (this.mobile) {
        this.toggleMenu()
      }
      this.$store.dispatch('updateTab', tab)
    },
    setUrl(tab) {
      if (window.location.href.match(/\?.*=/)) {
        window.location.href = window.location.origin + '?' + tab
      } else {
        this.$store.dispatch('updateTab', tab)
      }
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
      background-image: url("../assets/img/LEG_logos_final-01.webp");
      background-repeat: no-repeat;
      min-height: 180px;
      width: 235px;
      float: left;
    }

    .nav-bar {
      border: 0;
      font-size: 16px !important;
      line-height: 1.42857143 !important;
      letter-spacing: 4px;
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

  .feedback-mobile {
    p {
      color: #fff;
    }
  }

@media screen and (max-width: 767px) {
  nav {

    .hamburger {
      height: 42px;

      .fa-hamburger {
        color: #fff;
        font-size: 32px;
        margin: 4px 0 0 0;
        float: right;
      }
    }

    .nav-bar {

      &.hide {
        display: none;
      }

      ul {
        padding: 0;

        li {
          width: 100%;
        }
      }
    }
  }
}
</style>
