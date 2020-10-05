import { MathUtils } from './mathUtils'

type ContentType = {
  wrap: string
  min: number
  max: number
  isRandom?: boolean
}

class SmoothParallax {
  target: HTMLInputElement
  dummy: HTMLInputElement | HTMLElement
  docY: number
  lerpY: number
  ease: number
  reqId: number = 0
  items: Item[] = []

  constructor(target: string, ease: number, contents?: ContentType[], dummy?: string) {
    this.target = document.querySelector(target) as HTMLInputElement

    // heightを付与する場所をElementにするとスクロール位置がinnerのスクロール位置が保持されない
    // bodyのheightを直接指定すると解消する
    this.dummy = document.querySelector(dummy ?? 'body') as HTMLInputElement

    this.reset()

    const scrollY = SmoothParallax.getPageYScroll()
    this.docY = this.lerpY = scrollY

    this.ease = ease

    this.style()

    // 1回実行しないとなぜかリロード時にスクロール位置が保持されない
    this.onScroll()
    document.addEventListener('scroll', this.onScroll)

    window.addEventListener('resize', () => this.reset())

    this.update()

    if (contents) {
      contents.forEach(content => {
        const nodes = document.querySelectorAll(content.wrap)
        for (let i = 0; nodes[i]; i++) {
          if (nodes[i]) {
            const node = nodes[i]
            this.items.push(new Item(node as HTMLInputElement, content.min, content.max, content.isRandom))
          }
        }
      })
    }
  }

  static getPageYScroll = () => window.pageYOffset || document.documentElement.scrollTop

  style = () => {
    this.target.style.position = 'fixed'
    this.target.style.top = '0'
    this.target.style.left = '0'
    this.target.style.width =  '100%'
    this.target.style.overflow = 'hidden'
  }

  onScroll = () => this.docY = SmoothParallax.getPageYScroll()

  update = () => {
    this.lerpY = MathUtils.lerp(this.lerpY, this.docY, this.ease)
    this.lerpY < 0.1 ? this.lerpY = 0 : null
    this.target.style.transform = `translate3d(0, ${-1*this.lerpY}px, 0)`

    this.items.forEach(item => {
      item.update()
    })

    this.reqId = requestAnimationFrame(this.update)
  }

  reset = () => {
    const height = this.target.scrollHeight
    this.dummy.style.height = `${height}px`
  }

  destroy = () => cancelAnimationFrame(this.reqId)
}

class Item {
  wrap: HTMLInputElement
  min: number
  max: number
  winHeight: number = 0
  isVisible: boolean = false

  constructor(wrap: HTMLInputElement, min: number, max: number, isRandom?: boolean) {
    this.wrap = wrap
    //TODO: min maxをランダムで調整できるように機能追加する
    this.min = min
    this.max = max

    this.reset()
    window.addEventListener('resize', () => this.reset())
  }

  update = () => {
    const rect = this.wrap.getBoundingClientRect()

    const startPos = -1 * (rect.top - this.winHeight)
    const endPos = rect.height + this.winHeight

    const per = MathUtils.map(startPos, 0, endPos, 0, 1)
    this.wrap.style.transform = `translate3d(0, ${MathUtils.map(per, 0, 1, this.min, this.max)}px, 0)`

    //TODO: isVisibleの処理が無駄なので最適化
    const top = rect.top < this.winHeight
    const bottom = rect.bottom > 0

    this.isVisible = top && bottom
  }

  reset = () => {
    this.winHeight = window.innerHeight
  }
}

export default SmoothParallax
