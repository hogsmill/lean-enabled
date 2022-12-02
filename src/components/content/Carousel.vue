<template>
  <Carousel :autoplayxxx="3000" :wrap-around="true" :itemsToShow="5" :transition="1000">
    <Slide v-for="slide in 7" :key="slide">
      <div class="carousel__item">
        <div class="slide-content">
          <img :src="require('../../assets/img/carousel/image-' + slide + '.jpeg')" />
          <span>Caption {{ slide }}</span>
        </div>
      </div>
    </Slide>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Autoplay',
  components: {
    Carousel,
    Slide
  }
})
</script>

<style lang="scss">
.carousel__item {
  height: 300px;
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.slide-content {
  img {
    width: 100%;
  }
  text-align: center;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
