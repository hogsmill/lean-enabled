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
        this.setQuote()
      }
    })
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
  height: 262px;

  .quote-div {
    max-width: 80%;
    max-height: 72px;
    overflow: ellipsis;
    margin: 0 auto;
    font-size: x-large;
    line-height: 1.1;

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

@media screen and (max-width: 1100px) {
  .quotes {
    height: 180px;
    padding-top: 80px;

    .quote-div {
      font-size: large;

    }
  }
}
</style>
