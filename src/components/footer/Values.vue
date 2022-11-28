<template>
  <div class="values">
    <h2>
      Our Values
    </h2>
    <div class="row">
      <div v-for="(value, index) in values" :key="index" class="col-sm-3">
        <i class="fas" :class="getClass(value.title)" />
        <h3>
          {{ value.title }}
        </h3>
        <p v-for="(para, pindex) in value.text" :key="pindex">
          {{ para }}
        </p>
        <ul>
          <li v-for="(point, bindex) in value.points" :key="bindex">
            {{ point }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      classes: {
        'Trust': 'fa-hands-helping',
        'Respect': 'fa-heart',
        'Integrity': 'fa-hand-holding-heart',
        'People Focussed': 'fa-people-arrows'
      }
    }
  },
  computed: {
    values() {
      return this.$store.getters.getValues
    }
  },
  created() {

    bus.emit('sendLoad', 'value')

    bus.on('load', (data) => {
      if (data.type == 'value') {
        this.$store.dispatch('updateValues', data.objects)
      }
    })
  },
  methods: {
    getClass(val) {
      return this.classes[val]
    }
  }
}
</script>

<style lang="scss">
.values {
  padding: 16px;

  .fas {
    font-size: 36px;
    color: #204893;
  }
}
</style>
