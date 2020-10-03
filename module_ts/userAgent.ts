class UserAgent {
  ua: string

  constructor() {
    this.ua = window.navigator.userAgent.toLowerCase()
  }

  isIE = (): boolean => {
    return this.ua.indexOf('msie') != -1 || this.ua.indexOf('trident') != -1
  }

  isFireFox = (): boolean => {
    return this.ua.indexOf('firefox') != -1
  }

  isSafari = (): boolean => {
    return this.ua.indexOf('safari') != -1
  }

  isiOS = (): boolean => {
    return (
      this.ua.indexOf('iPhone') >= 0 ||
      this.ua.indexOf('iPod') >= 0 ||
      this.ua.indexOf('iPad') >= 0
    )
  }

  deviceType = (): 'sp' | 'tab' | 'pc' => {
    if (
      this.ua.indexOf('iPhone') > 0 ||
      this.ua.indexOf('iPod') > 0 ||
      (this.ua.indexOf('Android') > 0 && this.ua.indexOf('Mobile') > 0)
    ) {
      return 'sp'
    } else if (this.ua.indexOf('iPad') > 0 || this.ua.indexOf('Android') > 0) {
      return 'tab'
    }
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return 'sp'
    }
    // iPad
    if (
      /iPad|Macintosh/i.test(navigator.userAgent) &&
      'ontouchend' in document
    ) {
      return 'tab'
    }
    return 'pc'
  }
}

export { UserAgent }
