<template>
  <div class="admin">
    <h2>
      Admin (logged in as: {{ userName }})
    </h2>
    <div class="tabs">
      <div :class="{'active': tab == 'users'}" @click="setTab('users')">
        Users
      </div>
      <div :class="{'active': tab == 'quotes'}" @click="setTab('quotes')">
        Quotes
      </div>
      <div :class="{'active': tab == 'services'}" @click="setTab('services')">
        Services
      </div>
      <div :class="{'active': tab == 'courses'}" @click="setTab('courses')">
        Courses
      </div>
      <div :class="{'active': tab == 'course-comments'}" @click="setTab('course-comments')">
        Feedback
      </div>
      <div :class="{'active': tab == 'course-dates'}" @click="setTab('course-dates')">
        Course Dates
      </div>
      <div :class="{'active': tab == 'comments'}" @click="setTab('comments')">
        Comments
      </div>
      <div :class="{'active': tab == 'faqs'}" @click="setTab('faqs')">
        FAQs
      </div>
      <div :class="{'active': tab == 'blog'}" @click="setTab('blog')">
        Blog
      </div>
      <div :class="{'active': tab == 'people'}" @click="setTab('people')">
        People
      </div>
      <div :class="{'active': tab == 'content'}" @click="setTab('content')">
        Content
      </div>
    </div>
    <div class="details">
      <Emails v-if="tab == 'users'" />
      <Users v-if="tab == 'users'" />
      <Quotes v-if="tab == 'quotes'" />
      <Techniques v-if="tab == 'services'" />
      <Services v-if="tab == 'services'" />
      <Courses v-if="tab == 'courses'" />
      <CourseComments v-if="tab == 'course-comments'" />
      <CourseDates v-if="tab == 'course-dates'" />
      <Comments v-if="tab == 'comments'" />
      <Faqs v-if="tab == 'faqs'" />
      <Blog v-if="tab == 'blog'" />
      <People v-if="tab == 'people'" />
      <Content v-if="tab == 'content'" />
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import Users from './admin/Users.vue'
import Emails from './admin/Emails.vue'
import Quotes from './admin/Quotes.vue'
import Techniques from './admin/Techniques.vue'
import Services from './admin/Services.vue'
import Courses from './admin/Courses.vue'
import CourseComments from './admin/CourseComments.vue'
import CourseDates from './admin/CourseDates.vue'
import Comments from './admin/Comments.vue'
import Faqs from './admin/FAQs.vue'
import Blog from './admin/Blog.vue'
import People from './admin/People.vue'
import Content from './admin/Content.vue'

export default {
  components: {
    Users,
    Emails,
    Quotes,
    Services,
    Techniques,
    Courses,
    CourseComments,
    CourseDates,
    Comments,
    Faqs,
    Blog,
    People,
    Content
  },
  data() {
    return {
      tab: 'users'
    }
  },
  computed: {
    userName() {
      return this.$store.getters.getUserName
    }
  },
  created() {
    bus.emit('sendLoadUsers')

    bus.on('loadUsers', (data) => {
      this.users = data
    })
  },
  methods: {
    setTab(tab) {
      this.tab = tab
    }
  }
}
</script>

<style lang="scss">
.admin {
  max-width: 1200px;
  margin: 100px auto;

  h2 {
    text-align: center;
  }

  .far, .fas {
    margin: 3px;

    &:hover {
      cursor: pointer;
    }

    &.disabled {
      color: #aaa;

      &:hover {
        cursor: default;
      }
    }
  }

  .tabs {
    border-bottom: 1px solid #204893;

    div {
      display: inline-block;
      width: 100px;
      border-bottom: 1px solid #204893;
      background-color: #fff;
      position: relative;
      top: 1px;

      &.active {
        font-weight: bold;
        border: 1px solid #204893;
        border-bottom: 1px solid #fff;
      }
    }
  }

  .edit-hint {
    font-weight: normal;
  }

  .details {
    margin: 0 24px;

    table {
      margin: 0 auto;
      width: 100%;

      th, td {
        border: 1px solid;
        padding: 3px;
        vertical-align: top;
      }

      th {
        text-align: center;
      }

      td {
        &.center {
          text-align: center;
        }
      }
    }
  }
}
</style>
