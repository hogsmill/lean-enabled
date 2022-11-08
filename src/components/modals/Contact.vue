<template>
  <vue-final-modal name="contact" classes="modal-container" content-class="vfm__content modal-content" v-model="modals['contact']">
    <div class="float-right mr-2 mt-1">
      <button type="button" class="close" @click="hide" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="mt-4">
      <h4>Contact Us</h4>
      <p class="modal-form">
        If you'd like to learn more, do get in touch...
      </p>
      <div class="modal-form">
        <input type="text" id="email" class="form-control" placeholder="Email (optional)">
        <br>
        <textarea id="comments" rows="6" class="form-control" placeholder="Your comments" />
        <br>
        <button class="btn btn-sm btn-secondary smaller-font" @click="sendContact()">
          Send
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

import mailFuns from '../../lib/mail.js'

export default {
  components: {
    VueFinalModal
  },
  computed: {
    modals() {
      return this.$store.getters.getModals
    },
    site() {
      return this.$store.getters.getSite
    },
    emails() {
      console.log(this.$store.getters.getEmails())
      return this.$store.getters.getEmails()
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('hideModal', 'contact')
    },
    sendContact() {
      const site = this.site
      const emails = this.emails
      console.log(site, emails)
      mailFuns.post({
        action: 'Contact from ' + site,
        email: encodeURIComponent(document.getElementById('email').value),
        comments: encodeURIComponent(document.getElementById('comments').value),
        tomail: emails,
        fromsite: site
        },
        'Thanks for your feedback - we appreciate it!'
      )
      this.hide()
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-container {

    p.feedback-form {
      margin-bottom: 12px;
    }

    .feedback-form {
      width: 80%;
      margin: 0 auto;
    }
  }
</style>
