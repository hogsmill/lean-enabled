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
            <h4>
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

import textFuns from '../lib/text.js'

export default {
  data() {
    return {
      currentPost: {}
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
        this.currentPost = data.objects[0]
        this.$store.dispatch('updateBlog', data.objects)
      }
    })
  },
  methods: {
    getDate(post) {
      return post.day + '-' + post.month  + '-' + post.year
    },
    parseText(text) {
      return textFuns.parse(text)
    },
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
    }
  }

  .blog-post {
    margin: 12px;
    padding: 12px;

    h4 {
      text-align: right;
    }
  }
}
</style>
