const MODAL_CLASS = '.c-modal'
const MODAL_CLOSE = '.c-modal__close'
const MODAL_BG = '.c-modal__bg'
const MODAL_CONTENT = '.js-youtube_content'

const ACTIVE_CLASS = 'active'

class YoutubeModal {
  constructor(_youtubeID, _areaID, _triggerID) {
    if (typeof YT !== 'object') {
      console.error('Youtube API の読み込みに失敗しました')
      return
    }
    this.youtubeID = _youtubeID
    this.areaId = _areaID
    this.triggerId = _triggerID

    this.player = undefined
    this.playerInit()

    this.isAnim = false

    this.isIE = undefined
    this.isSP = undefined
    this.ua()

    this.eventInit()
  }

  /**
   * デバイス制御
   */
  ua() {
    const ua = window.navigator.userAgent.toLowerCase()
    this.isIE = ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1
    this.isSP =
      ua.indexOf('iPhone') > 0 ||
      ua.indexOf('iPod') > 0 ||
      (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) ||
      navigator.userAgent.match(/iPhone|Android.+Mobile/)
  }

  /**
   * Youtube player init
   */
  playerInit() {
    const div = document.createElement('div')
    div.setAttribute('id', this.areaId)
    document.querySelector(MODAL_CONTENT).appendChild(div)
    this.player = new YT.Player(this.areaId, {
      width: '100%',
      height: '100%',
      videoId: this.youtubeID,
      playerVars: {
        rel: 0,
        loop: 0,
        showinfo: 0,
      },
      events: {
        onReady: this.onReady.bind(this),
      },
    })
    document.getElementById(this.areaId).style.display = 'none'
  }
  onReady() {
    this.player.mute()
    this.player.setVolume(50)
  }

  /**
   * モーダルの処理全般 init
   */
  eventInit() {
    document
      .querySelector(this.triggerId)
      .addEventListener('click', this.open.bind(this))

    document
      .querySelector(MODAL_CLOSE)
      .addEventListener('click', this.close.bind(this))
    document
      .querySelector(MODAL_BG)
      .addEventListener('click', this.close.bind(this))
  }

  /**
   * モーダルが開くときの処理
   */
  open() {
    if (this.isAnim) return
    this.isAnim = true
    document.getElementById(this.areaId).style.display = 'block'
    this.disableScroll()
    this.enablePointerEvent()

    this.openMotion()
  }
  /**
   * モーダルの open Motion
   */
  openMotion() {
    document.querySelector(MODAL_CLASS).classList.add(ACTIVE_CLASS)

    setTimeout(() => {
      this.openComplete()
    }, 400)
  }
  openComplete() {
    this.isAnim = false
  }

  /**
   * モーダルが閉じるときの処理
   */
  close() {
    if (this.isAnim) return
    this.isAnim = true
    this.player.stopVideo()
    this.enableScroll()
    this.disablePointerEvent()

    this.closeMotion()
  }
  /**
   * モーダルの close Motion
   */
  closeMotion() {
    document.querySelector(MODAL_CLASS).classList.remove(ACTIVE_CLASS)

    setTimeout(() => {
      this.closeComplete()
    }, 300)
  }
  closeComplete() {
    document.getElementById(this.areaId).style.display = 'none'
    this.isAnim = false
  }

  /**
   * スクロール禁止
   */
  disableScroll() {
    if (this.isIE) {
      document.body.style.overflow = 'hidden'
    } else {
      document.addEventListener('mousewheel', this.eventPrevent, {
        passive: false,
      })
    }

    if (this.isSP) {
      document.addEventListener('touchmove', this.eventPrevent, {
        passive: false,
      })
    }
  }
  /**
   * スクロール禁止解除
   */
  enableScroll() {
    if (this.isIE) {
      document.body.style.overflow = 'auto'
    } else {
      document.removeEventListener('mousewheel', this.eventPrevent, {
        passive: false,
      })
    }

    if (this.isSP) {
      document.removeEventListener('touchmove', this.eventPrevent, {
        passive: false,
      })
    }
  }

  enablePointerEvent() {
    document.querySelector(MODAL_CLASS).style.pointerEvents = 'auto'
  }
  disablePointerEvent() {
    document.querySelector(MODAL_CLASS).style.pointerEvents = 'none'
  }

  eventPrevent(e) {
    e.preventDefault()
  }
}

export { YoutubeModal }
