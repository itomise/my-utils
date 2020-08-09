import { gsap } from 'gsap'
import { state } from '../modules/state'

/**
 * DOMUtil を返す関数
 * @param  {...any} s query name
 */
export const _ = (...s) => {
  const elem = document.querySelector(s)
  return new DOMUtil(elem)
}

export const _dom = {
  getQuery: (el) => {
    return document.querySelector(el)
  },
  getQueryAll: (el) => {
    return document.querySelectorAll(el)
  },
  removeActive: (cn) => {
    _dom.selectorCheck(cn)
    _dom.getQuery(cn).classList.remove('active')
  },
  removeActiveAll: (cn) => {
    const elements = _dom.getQueryAll(cn)
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('active')
    }
    // elements.forEach( el => {
    //   el.classList.remove('active')
    // })
  },
  addActive: (cn) => {
    _dom.selectorCheck(cn)
    _dom.getQuery(cn).classList.add('active')
  },
  addActiveAll: (cn) => {
    const elements = _dom.getQueryAll(cn)
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add('active')
    }
    // elements.forEach( el => {
    //   el.classList.add('active')
    // })
  },

  disableScrollActive: () => {
    if (state.isIE) {
      const html = document.getElementsByTagName('html')
      html[0].style.overflow = 'hidden'
    } else {
      document.addEventListener('mousewheel', _dom.scrollCancel, {
        passive: false,
      })
    }

    document.addEventListener('touchmove', _dom.scrollCancel, {
      passive: false,
    })
  },
  disableScrollPassive: () => {
    if (state.isIE) {
      const html = document.getElementsByTagName('html')
      html[0].style.overflow = 'auto'
    } else {
      document.removeEventListener('mousewheel', _dom.scrollCancel, {
        passive: false,
      })
    }
    document.removeEventListener('touchmove', _dom.scrollCancel, {
      passive: false,
    })
  },
  scrollCancel: (e) => {
    e.preventDefault()
  },

  selectorCheck: (cn) => {
    if (cn.indexOf('.') && cn.indexOf('#')) {
      console.error('指定のクラス・ID名に [ . ] || [ # ] がありません。')
    }
  },
}

class DOMUtil {
  constructor(el) {
    this.elem = el
    this.activeClass = 'active'
  }

  toggleClass() {
    this.elem.classList.toggle(this.activeClass)
  }

  onClick(f) {
    this.elem.addEventListener('click', f, false)
  }

  addSmoothScroll(className, fn) {
    this.elem.addEventListener('click', (e) => {
      e.preventDefault()

      const target = (function (doc) {
        if ('scrollingElement' in doc) {
          return doc.scrollingElement
        }
        return doc.documentElement
      })(document)

      const el = _dom.getQuery(className).getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      let to = el.top + scrollTop

      const dist = Math.floor(Math.abs(to - scrollTop) / 1000)

      let duration = 0.8

      // 遠かったら duration を遅くする
      if (dist > 4) duration = 1.3

      to -= _dom.getQuery('.l_header').clientHeight
      // 遠かったら duration を遅くする
      if (dist > 4) duration = 2.0

      gsap.to(target, {
        duration: duration,
        scrollTop: to,
        ease: 'power2.inOut',
      })
      if (fn) {
        fn()
      }
    })
  }

  /**
   * クリックで active クラスを付ける
   * @param  {...string} optionClassList 同時に active を付けたいクラスを指定
   */
  addClickActiveToggle(...optionClassList) {
    const _this = this

    this.elem.addEventListener('click', function () {
      this.classList.toggle(_this.activeClass)

      if (optionClassList) {
        optionClassList.forEach((el) => {
          _(el).toggleClass()
        })
      }
    })
  }

  enablePointerEvent() {
    this.elem.style.pointerEvents = 'auto'
  }
  disablePointerEvent() {
    this.elem.style.pointerEvents = 'none'
  }
}
