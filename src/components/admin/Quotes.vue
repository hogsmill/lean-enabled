<template>
  <div>
    <h3>
      New Quote
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Author
          </th>
          <th>
            Quote
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input id="new-author" type="text">
          </td>
          <td>
            <input id="new-quote" type="text">
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addQuote()">
              Add New
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      Quotes
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Author
          </th>
          <th>
            Quote
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quote, index) in quotes" :key="index">
          <td class="left">
            <span v-if="editing.id != quote.id">
              {{ quote.author }}
            </span>
            <input v-if="editing.id == quote.id" id="editing-author" type="text" :value="quote.author">
          </td>
          <td class="left">
            <span v-if="editing.id != quote.id">
              {{ quote.quote }}
            </span>
            <input v-if="editing.id == quote.id" id="editing-quote" type="text" :value="quote.quote">
          </td>
          <td>
            <i class="far fa-edit" title="Edit Quote" @click="editQuote(quote)" />
            <i class="far fa-save" title="Save Quote" :class="{'disabled': editing.id != quote.id}" @click="saveQuote(quote)" />
            <i class="far fa-trash-alt" title="Delete Quote" @click="deleteQuote(quote)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      editing: {}
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
  methods: {
    addQuote() {
      const data = {
        type: 'quote',
        author: document.getElementById('new-author').value,
        quote: document.getElementById('new-quote').value
      }
      bus.emit('sendCreate', data)
    },
    editQuote(quote) {
      this.editing = quote
    },
    saveQuote() {
      const data = {
        type: 'quote',
        id: this.editing.id,
        author: document.getElementById('editing-author').value,
        quote: document.getElementById('editing-quote').value
      }
      bus.emit('sendUpdate', data)
      this.editing = {}
    },
    deleteQuote(quote) {
      bus.emit('sendDelete', {type: 'quote', id: quote.id})
    }
  }
}
</script>

<style lang="scss">
input {
  width: 100%;
}
</style>
