class UserAgent {
  constructor() {
    this.ua = window.navigator.userAgent.toLowerCase()
  }

  isIE() {
    return this.ua.indexOf('msie') != -1 || this.ua.indexOf('trident') != -1
  }

  isFireFox() {
    return this.ua.indexOf('firefox') != -1
  }

  isSafari() {
    return this.ua.indexOf('safari') != -1
  }

  isiOS() {
    return (
      this.ua.indexOf('iPhone') >= 0 ||
      this.ua.indexOf('iPod') >= 0 ||
      this.ua.indexOf('iPad') >= 0
    )
  }

  /**
   * @returns {string} 'pc' or 'tab' or 'sp'
   */
  deviceType() {
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
      deviceType = 'sp'
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
