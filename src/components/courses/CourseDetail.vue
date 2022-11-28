<template>
  <div class="course-detail row">
    <video v-if="course.video" id="video" controls>
      <source :src="getUrl()" type="video/mp4">
    </video>
    <p v-for="(para, index) in course.description.text" :key="index">
      {{ para}}
    </p>
    <p v-if="course.description.activities.length">
      Typical activities include:
    </p>
    <ul>
      <li v-for="(activity, aindex) in course.description.activities" :key="aindex">
        {{ activity }}
      </li>
    </ul>
    <div>
      <div class="col-sm-4">
        <h3>
          Knowledge
        </h3>
        <ul>
          <li v-for="(knowledge, kindex) in course.knowledge" :key="kindex">
            <b>
              {{ knowledge.title }}
            </b>
            {{ knowledge.text }}
          </li>
        </ul>
      </div>
      <div class="col-sm-4">
        <h3>
          Skills
        </h3>
        <ul>
          <li v-for="(skill, sindex) in course.skills" :key="sindex">
            <b>
              {{ skill.title }}
            </b>
            {{ skill.text }}
          </li>
        </ul>
      </div>
      <div class="col-sm-4">
        <h3>
          Behaviours
        </h3>
        <ul>
          <li v-for="(behaviour, bindex) in course.behaviours" :key="bindex">
            <b>
              {{ behaviour.title }}
            </b>
            {{ behaviour.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'course'
  ],
  methods: {
    getUrl() {
      return window.location.pathname + 'video/L' + this.course.level + '.mov'
    }
  }
}
</script>

<style lang="scss">
.course-detail {

  #video {
    float: right;
    width: 40%;
    margin: 0 0 6px 6px;
  }
  
  p {
    color: #444;
    text-align: left;
  }
}
</style>
