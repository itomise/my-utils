import '../styles/home.scss'
import { stateInit } from './modules/state/state'
import { YoutubeModal } from './modules/youtube'

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
  new YoutubeModal('5qap5aO4i9A', 'youtube01', '#modal01play')
  new YoutubeModal('DWcJFNfaw9c', 'youtube02', '#modal02play')
  new YoutubeModal('rQO8escJC78', 'youtube03', '#modal03play')
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

window.addEventListener('load', () => {
  load()
})
