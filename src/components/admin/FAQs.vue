<template>
  <div>
    <h3>
      New FAQ
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Question
          </th>
          <th>
            Answer
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input id="new-question" type="text">
          </td>
          <td>
            <input id="new-answer" type="text">
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addFaq()">
              Add New
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      FAQs
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Question
          </th>
          <th>
            Answer
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(faq, index) in faqs" :key="index">
          <td>
            <span v-if="editing.id != faq.id">
              {{ faq.question }}
            </span>
            <input v-if="editing.id == faq.id" id="editing-question" type="text" :value="faq.question">
          </td>
          <td>
            <span v-if="editing.id != faq.id">
              {{ faq.answer }}
            </span>
            <input v-if="editing.id == faq.id" id="editing-answer" type="text" :value="faq.answer">
          </td>
          <td>
            <i class="far fa-edit" title="Edit FAQ" @click="editFaq(faq)" />
            <i class="far fa-save" title="Save FAQ" :class="{'disabled': editing.id != faq.id}" @click="saveFaq(faq)" />
            <i class="far fa-trash-alt" title="Delete FAQ" @click="deleteFaq(faq)" />
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
    faqs() {
      return this.$store.getters.getFaqs
    }
  },
  created() {

    bus.emit('sendLoad', 'faq')

    bus.on('load', (data) => {
      if (data.type == 'faq') {
        this.$store.dispatch('updateFaqs', data.objects)
      }
    })
  },
  methods: {
    addFaq() {
      const data = {
        type: 'faq',
        question: document.getElementById('new-question').value,
        answer: document.getElementById('new-answer').value
      }
      bus.emit('sendCreate', data)
    },
    editFaq(faq) {
      this.editing = faq
    },
    saveFaq() {
      const data = {
        type: 'faq',
        id: this.editing.id,
        question: document.getElementById('editing-question').value,
        answer: document.getElementById('editing-answer').value
      }
      bus.emit('sendUpdate', data)
      this.editing = {}
    },
    deleteFaq(faq) {
      bus.emit('sendDelete', {type: 'faq', id: faq.id})
    }
  }
}
</script>

<style lang="scss">
</style>
