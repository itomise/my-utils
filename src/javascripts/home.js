import '../styles/home.scss'
// import { onYouTubeIframeAPIReady } from './modules/youtube/youtube'
import { stateInit } from './modules/state/state'

if (module.hot) {
  module.hot.accept(console.error)
  module.hot.dispose(() => {
    window.location.reload()
  })
}

const init = () => {
  stateInit()
  // onYouTubeIframeAPIReady()
  console.log('1')
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
