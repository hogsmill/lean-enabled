<template>
  <div>
    <h3>
      New Blog Entry
    </h3>
    <table>
      <thead>
        <tr>
          <th>
            Date
          </th>
          <th>
            Title
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <select id="new-day">
              <option value="">
                -- DD --
              </option>
              <option v-for="(day, d) in 31" :key="d">
                {{ day }}
              </option>
            </select>
            <select id="new-month">
              <option value="">
                -- MM --
              </option>
              <option v-for="(month, m) in 12" :key="m">
                {{ month }}
              </option>
            </select>
            <select id="new-year">
              <option value="">
                -- YY --
              </option>
              <option v-for="(year, y) in 5" :key="y">
                {{ 2021 + year }}
              </option>
            </select>
          </td>
          <td>
            <input type="text" id="new-title">
          </td>
          <td>
            <button class="btn btn-sm btn-secondary smaller-font" @click="addBlog()">
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      Blog Entries
    </h3>
    {{ editing }}
    <table>
      <thead>
        <tr>
          <th>
            Date
          </th>
          <th>
            Title
          </th>
          <th>
            Content
          </th>
          <th>
            File
          </th>
          <th>
            Enabled?
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in blog" :key="index">
          <td>
            <span v-if="editing.id != post.id">
              {{ post.day }}/{{ post.month }}/{{ post.year }}
            </span>
            <select v-if="editing.id == post.id" id="editing-day" :value="editing.day">
              <option value="">
                -- DD --
              </option>
              <option v-for="(day, d) in 31" :key="d">
                {{ day }}
              </option>
            </select>
            <select v-if="editing.id == post.id" id="editing-month" :value="editing.month">
              <option value="">
                -- MM --
              </option>
              <option v-for="(month, m) in 12" :key="m">
                {{ month }}
              </option>
            </select>
            <select v-if="editing.id == post.id" id="editing-year" :value="editing.year">
              <option value="">
                -- YY --
              </option>
              <option v-for="(year, y) in 5" :key="y">
                {{ 2021 + year }}
              </option>
            </select>
          </td>
          <td>
            <span v-if="editing.id != post.id">
              {{ post.title }}
            </span>
            <input type="text" v-if="editing.id == post.id" id="editing-title" :value="post.title">
          </td>
          <td>
            <span v-if="editing.id != post.id">
              <p v-for="(para, pindex) in post.text" :key="pindex">
                {{ para }}
              </p>
            </span>
            <span v-if="editing.id == post.id">
              <table>
                <tr v-for="(para, pindex) in text" :key="pindex">
                  <td>
                    <textarea :id="'paragraph-' + pindex" :value="text[pindex]" />
                  </td>
                  <td>
                    <i class="fas fa-times" title="Delete this paragraph" @click="deleteParagraph(pindex)" />
                  </td>
                </tr>
              </table>
              <button class="btn btn-primary smaller-font" @click="addParagraph()">
                Add New Paragraph
              </button>
            </span>
          </td>
          <td>
            <span v-if="editing.id != post.id">
              {{ post.file }}
            </span>
            <input type="text" v-if="editing.id == post.id" id="editing-file" :value="post.file">
          </td>
          <td>
            <span v-if="editing.id != post.id">
              <i v-if="post.enabled" class="fas fa-check" />
              <i v-if="!post.enabled" class="fas fa-times" />
            </span>
            <input v-if="editing.id == post.id" id="editing-enabled" type="checkbox" :checked="post.enabled">
          </td>
          <td>
            <i class="far fa-edit" title="Edit" @click="editBlog(post)" />
            <i class="far fa-save" title="Save" :class="{'disabled': editing.id != post.id}" @click="saveBlog(post)" />
            <i class="far fa-trash-alt" title="Delete" @click="deleteBlog(post)" />
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
      text: []
    }
  },
  computed: {
    blog() {
      return this.$store.getters.getBlog
    }
  },
  created() {

    bus.emit('sendLoad', 'blog')

    bus.on('load', (data) => {
      if (data.type == 'blog') {
        this.$store.dispatch('updateBlog', data.objects)
      }
    })
  },
  methods: {
    addBlog() {
      const data = {
        type: 'blog',
        day: document.getElementById('new-day').value,
        month: document.getElementById('new-month').value,
        year: document.getElementById('new-year').value,
        title: document.getElementById('new-title').value
      }
      bus.emit('sendCreate', data)
    },
    editBlog(blog) {
      this.editing = blog
      this.text = blog.text
    },
    addParagraph() {
      this.text.push('')
    },
    saveBlog() {
      const text = []
      for (let i = 0; i < this.text.length; i++) {
        const para = document.getElementById('paragraph-' + i).value
        text.push(para)
      }
      console.log(text)
      const data = {
        type: 'blog',
        id: this.editing.id,
        day: document.getElementById('editing-day').value,
        month: document.getElementById('editing-month').value,
        year: document.getElementById('editing-year').value,
        title: document.getElementById('editing-title').value,
        text: text,
        file: document.getElementById('editing-file').value,
        enabled: document.getElementById('editing-enabled').checked
      }
      bus.emit('sendUpdate', data)
      this.editing = {}
    },
    deleteBlog(blog) {
      bus.emit('sendDelete', {type: 'blog', id: blog.id})
    }
  }
}
</script>

<style lang="scss">
select {
  margin: 2px;
}
</style>
