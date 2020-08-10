import './modules/importPug'
import '../styles/main.scss'
import './modules/youtube/loadYoutubeTag'

if (module.hot) {
  module.hot.accept(console.error)
  module.hot.dispose(() => {
    window.location.reload()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

const init = () => {}
