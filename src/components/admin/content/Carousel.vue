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
            <th>
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
                <thead>
                  <tr>
                    <th>
                      Images
                    </th>
                    <th>
                      Captions
                    </th>
                  </tr>
                </thead>
                <tr v-for="(slide, sindex) in carousel.slides" :key="sindex">
                  <td>
                    <img v-if="slide.image" :src="require('../../../assets/img/carousel/' + slide.image)">
                    <div v-if="editing.id == carousel.id">
                      <input type="file" :id="'upload-' + sindex">
                      <button @click="submitFile(sindex)">
                        Upload Image
                      </button>
                    </div>
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

    bus.on('fileUploaded', (data) => {
      if (data.id == this.editing.id) {
        this.editing.slides[data.slide].image = data.name
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
    submitFile(s) {
      const element = document.getElementById('upload-' + s)
      const file = element.files[0]
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      const data = {
        name: file.name,
        type: 'carousel',
        fileType: 'image',
        id: this.editing.id,
        slide: s
      }
      fileReader.onload = () => {
        data.content = fileReader.result
        bus.emit('sendUploadFile', data)
      }
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
