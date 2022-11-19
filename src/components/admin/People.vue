<template>
  <div>
    <h3>
      New Person
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Role
          </th>
          <th>
            Email
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input id="new-name" type="text">
          </td>
          <td>
            <input id="new-role" type="text">
          </td>
          <td>
            <input id="new-email" type="text">
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addPerson()">
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
            Name
          </th>
          <th>
            Role
          </th>
          <th>
            Email
          </th>
          <th>
            Text
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person, index) in people" :key="index">
          <td>
            <span v-if="editing.id != person.id">
              {{ person.name }}
            </span>
            <input v-if="editing.id == person.id" id="editing-name" type="text" :value="person.name">
          </td>
          <td>
            <span v-if="editing.id != person.id">
              {{ person.role }}
            </span>
            <input v-if="editing.id == person.id" id="editing-role" type="text" :value="person.role">
          </td>
          <td>
            <span v-if="editing.id != person.id">
              {{ person.email }}
            </span>
            <input v-if="editing.id == person.id" id="editing-email" type="text" :value="person.email">
          </td>
          <td>
            <span v-if="editing.id != person.id">
              <p v-for="(text, tindex) in person.text" :key="tindex">
                {{ text }}
              </p>
            </span>
            <span v-if="editing.id == person.id">
              <table class="paragraphs">
                <tr v-for="(text, tindex) in editing.text" :key="tindex">
                  <td>
                    <textarea :id="'paragraph-' + tindex" :value="text" />
                  </td>
                  <td>
                    <i class="fas fa-times" title="Delete this paragraph" @click="deleteParagraph(tindex)" />
                  </td>
                </tr>
              </table>
              <button class="btn btn-primary smaller-font" @click="addParagraph(person)">
                Add New Paragraph
              </button>
            </span>
          </td>
          <td>
            <i class="far fa-edit" title="Edit FAQ" @click="editPerson(person)" />
            <i class="far fa-save" title="Save FAQ" :class="{'disabled': editing.id != person.id}" @click="savePerson(person)" />
            <i class="far fa-trash-alt" title="Delete FAQ" @click="deletePerson(person)" />
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
      editing: {},
    }
  },
  computed: {
    people() {
      return this.$store.getters.getPeople
    }
  },
  created() {

    bus.emit('sendLoad', 'person')

    bus.on('load', (data) => {
      if (data.type == 'person') {
        this.$store.dispatch('updatePeople', data.objects)
      }
    })
  },
  methods: {
    addPerson() {
      const name = document.getElementById('new-name').value
      const tag = name.match(/^(\w+)\s/)[1].toLowerCase()
      const data = {
        type: 'person',
        name: name,
        role: document.getElementById('new-role').value,
        email: document.getElementById('new-email').value,
        pic: tag + '-pic',
        endorsements: tag + '-endorsements'
      }
      bus.emit('sendCreate', data)
    },
    editPerson(person) {
      this.editing = person
    },
    addParagraph() {
      this.editing.text.push('')
    },
    deleteParagraph(n) {
      const text = []
      for (let i = 0; i < this.editing.text.length; i++) {
        if (i != n) {
          text.push(this.editing.text[i])
        }
      }
      this.editing.text = text
    },
    savePerson() {
      let i = 0
      const paras = []
      while (document.getElementById('paragraph-' + i)) {
        paras.push(document.getElementById('paragraph-' + i).value)
        i++
      }
      const data = this.editing
      data.type = 'person',
      data.name = document.getElementById('editing-name').value,
      data.role = document.getElementById('editing-role').value,
      data.email = document.getElementById('editing-email').value,
      data.text = paras
      bus.emit('sendUpdate', data)
      this.editing = {}
    },
    deletePerson(person) {
      bus.emit('sendDelete', {type: 'person', id: person.id})
    }
  }
}
</script>

<style lang="scss">
p {
  text-align: left;
}
textarea {
  width: 100%;
}
.paragraphs {
  td {
    border: none !important;
  }
}
</style>
