<template>
  <div>
    <h3>
      Carousel
      <i v-if="expanded != 'carousel'" title="Show edit" class="far fa-plus-square" @click="toggleExpanded()" />
      <i v-if="expanded == 'carousel'" title="Collapse edit" class="far fa-minus-square" @click="toggleExpanded()" />
    </h3>
    <div v-if="expanded == 'carousel'">
      <table>
        <thead>
          <tr>
           <th>
             Name
            </th>
            <th colspan="2">
              Slides
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(carousel, index) in carousels" :key="index">
            <td>
              {{ carousel.name }}
            </td>
            <td>
              <table class="slides">
                <tr v-for="(slide, sindex) in carousel.slides" :key="sindex">
                  <td>
                    <img :src="require('../../../assets/img/carousel/' + slide.image)" />
                  </td>
                  <td>
                    <span v-if="editing.id != carousel.id">
                      {{ slide.caption }}
                    </span>
                    <input type="text" v-if="editing.id == carousel.id" :id="'caption-' + sindex" :value="slide.caption">
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <i class="far fa-edit" :title="'Edit ' + carousel.name" @click="edit(carousel)" />
              <i class="far fa-save" :title="'Save ' + carousel.name" :class="{'disabled': editing.id != carousel.id}" @click="save(carousel)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import bus from '../../../socket.js'

export default {
  data() {
    return {
      editing: false,
      text: []
    }
  },
  computed: {
    expanded() {
      return this.$store.getters.getExpanded
    },
    carousels() {
      return this.$store.getters.getCarousels
    }
  },
  created() {

    bus.emit('sendLoad', 'carousel')

    bus.on('load', (data) => {
      if (data.type == 'carousel') {
        this.$store.dispatch('updateCarousels', data.objects)
      }
    })
  },
  methods: {
    toggleExpanded() {
      const expanded = this.expanded == 'carousel' ? '' : 'carousel'
      this.$store.dispatch('updateExpanded', expanded)
    },
    edit(carousel) {
      this.editing = carousel
    },
    addHeading() {
      this.text.push({
        type: 'header',
        text: ''
      })
    },
    save() {
      const newSlides = []
      for (let i = 0; i < this.editing.slides.length; i++) {
        const caption = document.getElementById('caption-' + i).value
        newSlides.push({
          image: this.editing.slides[i].image,
          caption: caption
        })
      }
      const data = {
        type: 'carousel',
        id: this.editing.id,
        name: this.editing.name,
        slides: newSlides
      }
      bus.emit('sendUpdate', data)
      this.editing = false
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
.slides {
  img {
    width: 200px;
  }
}
</style>
