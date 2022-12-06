<template>
  <div class="quotes">
    <div class="quote-div">
      <span v-if="randomQuote" class="quote-text">
        "{{ randomQuote.quote }}"
      </span>
      <span v-if="randomQuote">
        -
      </span>
      <span v-if="randomQuote" class="quote-author">
        {{ randomQuote.author }}
      </span>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  data() {
    return {
      randomQuote: {
        quote: '',
        author: ''
      }
    }
  },
  computed: {
    quotes() {
      return this.$store.getters.getQuotes
    }
  },
  created() {

    bus.emit('sendLoad', 'quote')

    bus.on('load', (data) => {
      if (data.type == 'quote') {
        this.$store.dispatch('updateQuotes', data.objects)
      }
    })
  },
  mounted() {
    this.setQuote()
  },
  methods: {
    setQuote() {
      const rand = parseInt(Math.random() * this.quotes.length)
      this.randomQuote = this.quotes[rand]
      window.setTimeout(() => {
        this.setQuote()
      }, 5000)
    }
  }
}
</script>

<style lang="scss">
.quotes {
  background-color: #DAD8DB;
  padding-top: 176px;
  height: 232px;

  .quote-div {
    max-width: 80%;
    margin: 0 auto;

    span {
      margin: 0 3px;
    }

    .quote-text {
      font-style: italic;
    }

    .quote-author {
      font-weight: bold;
    }
  }
}
</style>
