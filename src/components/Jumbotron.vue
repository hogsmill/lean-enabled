<template>
  <div class="hero jumbotron text-center">
    <h1>Lean Enabled Group</h1>
    <h2>Makng Change Sustainable</h2>
    <div class="input-group subscribe">
      <input type="email" id="jumbotron-email" class="form-control" size="50" placeholder="Email Address" required>
      <div class="input-group-btn">
        <button id="subscribe" class="btn btn-info" @click="contact()">
          Contact Us
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import mailFuns from '../lib/mail.js'

export default {
  methods: {
    contact() {
      const email = document.getElementById('jumbotron-email').value
      if (!email) {
        alert('Please enter an email')
      } else {
        mailFuns.post({
          action: 'Contact from Agile Simulations (Jumbotron)',
          email: email,
          },
          'Thanks for your interest - we\'ll get back to you soon!'
        )
      }
    }
  }
}
</script>

<style lang="scss">
  .jumbotron {
    background-color: #DAD8DB;
    color: #fff !important;
    padding: 180px 25px 36px 25px !important;
    font-family: Montserrat, sans-serif;
    margin-bottom: 0 !important;

    h1, p {
      color: #204893;
    }

    .subscribe {
      max-width: 400px;
      margin: 0 auto;
    }
  }
</style>
