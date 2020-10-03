import '../styles/parallax.scss'
import Parallax from './modules/parallax'
import { stateInit } from './modules/state/state'

if (module.hot) {
  module.hot.accept(console.error)
  module.hot.dispose(() => {
    window.location.reload()
  })
}

const init = () => {
  stateInit()
}

const load = () => {
  new Parallax()
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

window.addEventListener('load', () => {
  load()
})
