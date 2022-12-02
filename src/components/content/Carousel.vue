<template>
  <div class="sliderm demo">
    <div class="sliderm__slider">
      <div class="sliderm__slides">
        <div class="sliderm__slide">
          <img :src="require('../../assests/img/carousel/image-1.jpeg'" />
          Caption image 1
        </div>
        <div class="sliderm__slide"><img src="/img/carousel/image-2.jpeg" />
          Caption image 2
        </div>
        <div class="sliderm__slide"><img src="/img/carousel/image-3.jpeg" />
          Caption image 3
        </div>
        <div class="sliderm__slide"><img src="/img/carousel/image-4.jpeg" />
          Caption image 4
        </div>
        <div class="sliderm__slide"><img src="/img/carousel/image-5.jpeg" />
          Caption image 5
        </div>
        <div class="sliderm__slide"><img src="/img/carousel/image-6.jpeg" />
          Caption image 6
        </div>
        <div class="sliderm__slide"><img src="/img/carousel/image-7.jpeg" />
          Caption image 7
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sliderm from 'sliderm'
import 'sliderm/src/assets/scss/index.scss'

export default {
  mounted() {
    const sliderm = new Sliderm('.demo', {
      /**
       * Display the arrow buttons.
       *
       * @type {Boolean}
       */
      arrow: true,
      /**
       * Display the pagination, dot, dot, dots.
       *
       * @type {Boolean}
       */
      pagination: true,
      /**
       * Display the spinner when loading the slider.
       *
       * @type {Boolean}
       */
      spinner: true,
      /**
       * Slide column group or just single column group.
       *
       * @type {Boolean}
       */
      grouping: false,
      /**
       * Transform the slider into a carousel.
       *
       * @type {Boolean}
       */
      loop: true,
      /**
       * Preview a part of the previous and next item.
       *
       * @type {Boolean}
       */
      preview: false,
      /**
       * Make the slider responsive.
       *
       * @type {Boolean}
       */
      breakpoint: true,
      /**
       * Add support for mobile devices to touch left and right swipe.
       *
       * @type {Boolean}
       */
      touch: true,
      /**
       * Autoplay the carousel.
       *
       * @type {Boolean}
       */
      autoplay: true,
      /**
       * How many items per view
       *
       * @type {Boolean}
       */
      columns: 4,
      /**
       * The duration of transition.
       *
       * @type {Number}
       */
      duration: 1000,
      /**
       * The spacing between each item.
       *
       * @type {Number}
       */
      spacing: 10,

    })

    sliderm.on('slide.start', () => {
      console.log('Just starting to slide!')
    })
    sliderm.on('slide.end', () => {
      console.log('The slider is stopped.')
    })
  }
}
</script>

<style>
  .demo {
    width: 80%;
    margin: 60px auto;
  }
</style>
