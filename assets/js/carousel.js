import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

const OPTIONS = {
  loop: true,
}

const PLUGINS = [
  Autoplay({
    delay: 5000,
  }),
  WheelGesturesPlugin({
    forceWheelAxis: "x",
  })
]

class CarouselElement extends HTMLElement {
  emblaApi
  autoplayApi
  prevBtn
  nextBtn
  playBtn
  pauseBtn
  dots

  connectedCallback() {
    let viewportElement = this.querySelector(".embla__viewport")
    this.prevBtn = this.querySelector('.embla__button--prev')
    this.nextBtn = this.querySelector('.embla__button--next')
    this.playBtn = this.querySelector('.embla__button--play')
    this.pauseBtn = this.querySelector('.embla__button--pause')
    this.dots = this.querySelector('.embla__dots')

    this.emblaApi = EmblaCarousel(viewportElement, OPTIONS, PLUGINS)

    const updateState = () => {
      this.toggleDotBtnsActive()
      this.togglePlayBtnState(this.autoplayApi.isPlaying())
    }
    this.emblaApi
      .on('select', updateState)
      .on('init', updateState)
      .on('reInit', updateState)

    this.emblaApi
      .on('autoplay:play', () => this.togglePlayBtnState(true))
      .on('autoplay:stop', () => this.togglePlayBtnState(false))

    this.autoplayApi = this.emblaApi?.plugins()?.autoplay

    this.addPrevNextBtnHandlers()
    this.addPlayPauseBtnHandler()
    this.addDotsHandler()
  }

  addPrevNextBtnHandlers() {
    const scrollNext = () => {
      this.emblaApi.scrollNext()
      this.autoplayApi.reset()
    }
    const scrollPrev = () => {
      this.emblaApi.scrollPrev()
      this.autoplayApi.reset()
    }

    this.prevBtn?.addEventListener('click', scrollPrev, false)
    this.nextBtn?.addEventListener('click', scrollNext, false)
  }

  addPlayPauseBtnHandler() {
    this.playBtn?.addEventListener('click', () => this.autoplayApi.play(), false)
    this.pauseBtn?.addEventListener('click', () => this.autoplayApi.stop(), false)
  }

  addDotsHandler() {
    const dots = this.dots?.querySelectorAll('.embla__dot')
    for (const dot of dots) {
      dot.addEventListener('click', () => {
        const indexStr = dot.getAttribute("data-index")
        const index = parseInt(indexStr)
        if (!isNaN(index)) {
          this.emblaApi.scrollTo(index)
          this.autoplayApi.reset()
        }
      }, false)
    }
  }

  togglePlayBtnState(isPlaying) {
    if (isPlaying) {
      this.playBtn?.classList.add("hidden")
      this.pauseBtn?.classList.remove("hidden")
    } else {
      this.playBtn?.classList.remove("hidden")
      this.pauseBtn?.classList.add("hidden")
    }
  }

  toggleDotBtnsActive() {
    const previous = this.emblaApi.previousScrollSnap()
    const selected = this.emblaApi.selectedScrollSnap()
    const previousBtn = this.dots?.querySelector(`.embla__dot[data-index="${previous}"]`)
    const selectedBtn = this.dots?.querySelector(`.embla__dot[data-index="${selected}"]`)
    previousBtn?.classList.remove('selected')
    selectedBtn?.classList.add('selected')
  }
}

customElements.define("embla-carousel", CarouselElement)

