import '../styles/parallax.scss'
import Parallax from '../../module/smoothParallax'
import { stateInit } from './modules/state/state'

if (module.hot) {
  module.hot.accept(console.error)
  module.hot.dispose(() => {
    window.location.reload()
  })
}

const init = () => {
  stateInit()
  new Parallax('.js_smooth__target', 0.1)
}

const load = () => {}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

window.addEventListener('load', () => {
  load()
})
