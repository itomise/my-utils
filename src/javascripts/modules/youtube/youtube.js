import { _, _dom } from './DOMUtil'
import gsap from 'gsap'

const ytData = [
  {
    id: 'hntsC2PDmPE', //youtubeのID
    area: 'modal01Inner', //youtube表示する場所
    target: '#modal01', //表示されるするモーダル
    trigger: '#modal01play', //モーダルのトリガー
    close: '#modal01Close', //非表示のトリガー
    wrap: '#modal01Bg', // ラップ
    contentWrap: '#modal01Wrap',
    closeMask: '#modal01CloseMask',
  },
]

// playerは配列にしてグローバルに宣言
let ytModalPlayer = []
// モーダルの幅と高さ指定
const modalIframeWidth = '100%'
const modalIframeHeight = '100%'

let isAnim = false

function onYouTubeIframeAPIReady() {
  let width = modalIframeWidth
  let height = modalIframeHeight

  // if (window.innerWidth < state.breakPoint.sp) {
  //   const wrap = _dom.getQuery('.c-modal__contentWrap')
  //   width = wrap.clientWidth
  //   height = wrap.clientHeight
  // }

  // youtube api エラー処理
  if (typeof YT !== 'object') {
    ytModalPlayer = undefined
    return
  }

  ytData.forEach((yt, index) => {
    ytModalPlayer[index] = new YT.Player(
      // eslint-disable-next-line prettier/prettier
      yt['area'],
      {
        width: width,
        height: height,
        videoId: yt['id'],
        playerVars: {
          rel: 0,
          loop: 0,
          showinfo: 0,
        },
        events: {
          onReady: function () {
            onPlayerReady(index)
          },
        },
      }
    )

    // 画像部分をクリックしたらモーダルがでるようにする
    // モーダルがでたら html の overflow を hidden に
    _(yt['trigger']).addClickActiveToggle(yt['target'])
    _(yt['trigger']).onClick(() => {
      if (isAnim) return
      isAnim = true
      _dom.disableScrollActive()
      // ytModalPlayer[index].playVideo()
      _(yt['target']).enablePointerEvent()

      _dom.addActive(yt['contentWrap'])
      setTimeout(() => {
        _dom.addActive(yt['closeMask'])
        gsap.to('.c-modal__closeOver', {
          delay: 0.5,
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.6,
          ease: 'expo.out',
          onComplete: () => {
            isAnim = false
          },
        })
      }, 400)
    })

    // モーダルクローズ処理、wrap もクリックで閉じれるようにする
    _(yt['close']).onClick(() => {
      if (isAnim) return
      isAnim = true
      ytModalPlayer[index].stopVideo()
      _dom.removeActive(yt['target'])
      _dom.disableScrollPassive()
      _(yt['target']).disablePointerEvent()

      setTimeout(() => {
        _dom.removeActive(yt['contentWrap'])
        _dom.removeActive(yt['closeMask'])
        gsap.set('.c-modal__closeOver', {
          scaleX: 1,
        })
        isAnim = false
      }, 300)
    })
    _(yt['wrap']).onClick(() => {
      if (isAnim) return
      isAnim = true
      ytModalPlayer[index].stopVideo()
      _dom.removeActive(yt['target'])
      _dom.disableScrollPassive()
      _(yt['target']).disablePointerEvent()

      setTimeout(() => {
        _dom.removeActive(yt['contentWrap'])
        _dom.removeActive(yt['closeMask'])
        gsap.set('.c-modal__closeOver', {
          scaleX: 1,
        })
        isAnim = false
      }, 300)
    })
    // window.addEventListener('resize', () => {
    //   onResize(index)
    // })
  })
}

const onPlayerReady = (index) => {
  ytModalPlayer[index].mute()
  ytModalPlayer[index].setVolume(50)
}

const onResize = () => {}

export { onYouTubeIframeAPIReady }
