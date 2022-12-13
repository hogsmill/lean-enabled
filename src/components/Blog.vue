<template>
  <div class="blog">
    <div class="row">
      <div class="col-sm-9">
        <div class="blog-post">
          <div v-if="currentPost.title">
            <h3>
              {{ currentPost.title }}
            </h3>
            <h4>
              {{ getDate(currentPost) }}
            </h4>
            <img v-if="currentPost.image" :src="require(`../assets/img/blog/${currentPost.image}`)">
            <p v-for="(para, pindex) in currentPost.text" :key="pindex" v-html="parseText(para)" />
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="blog-index">
          <h3>
            Blog Index
          </h3>
          <div v-for="(post, index) in blog" :key="index">
            <h4 @click="selectPost(post)" :class="{'selected': post.id == currentPost.id}">
              {{ getDate(post) }}
              {{ post.title }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import dateFuns from '../lib/date.js'
import textFuns from '../lib/text.js'
import domFuns from '../lib/dom.js'

export default {
  computed: {
    blog() {
      return this.$store.getters.getBlog
    },
    currentPost() {
      return this.$store.getters.getCurrentBlogPost
    }
  },
  created() {

    bus.emit('sendLoad', 'blog')

    bus.on('load', (data) => {
      if (data.type == 'blog') {
      const posts = data.objects.sort((a, b) => {
        a = new Date(a.year, a.month - 1, a.day)
        b = new Date(b.year, b.month - 1, b.day)
        return b - a
      })
      this.$store.dispatch('updateCurrentBlogPost', posts[0])
      this.$store.dispatch('updateBlog', posts)
      }
    })
  },
  updated() {
    domFuns.addLinkEvents(this.$store)
  },
  methods: {
    getDate(post) {
      return dateFuns.getDate(post.day, post.month, post.year)
    },
    parseText(text) {
      return textFuns.parse(text)
    },
    selectPost(post) {
      this.$store.dispatch('updateCurrentBlogPost', post)
    },
    setTab(tab) {
      domFuns.setTab(this.$store, tab)
    }
  }
}
</script>

<style lang="scss">
.blog {
  margin: 0 auto;
  max-width: 950px;

  .blog-index {
    margin: 12px;
    padding: 12px;
    background-color: #DAD8DB;

    h4 {
      text-align: left;
      font-size: large;
      padding: 3px;

      &.selected {
        background-color: #204893;
        color: #fff;
      }
    }
  }

  .blog-post {
    margin: 12px;
    padding: 12px;

    h4 {
      text-align: right;
    }

    img {
      float: right;
      width: 40%;
      margin: 0 0 6px 6px;
    }
  }
}
</style>
