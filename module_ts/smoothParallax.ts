import { MathUtil } from './mathUtil'

class SmoothParallax {
  target: HTMLInputElement
  dummy: HTMLInputElement | HTMLElement
  currentTargetHeight: number = 0
  docY: number
  lerpY: number
  amount: number
  reqId: number = 0
  items: Item[] = []

  constructor(target: string, amount: number, contents?: [], dummy?: string) {
    this.target = document.querySelector(target) as HTMLInputElement

    // heightを付与する場所をElementにするとスクロール位置がinnerのスクロール位置が保持されない
    // bodyのheightを直接指定すると解消する
    this.dummy = document.querySelector(dummy ?? 'body') as HTMLInputElement

    this.reset()

    this.docY = this.lerpY = SmoothParallax.getPageYScroll()

    this.amount = amount

    this.style()

    // this.items.push(new Item(document.querySelector('.js_smooth__item') as HTMLInputElement))

    // 1回実行しないとなぜかリロード時にスクロール位置が保持されない
    this.onScroll()
    document.addEventListener('scroll', this.onScroll)

    window.addEventListener('resize', this.reset)

    this.update()
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
    this.lerpY = MathUtil.lerp(this.lerpY, this.docY, this.amount)
    this.lerpY < 0.1 ? this.lerpY = 0 : null
    this.target.style.transform = `translate3d(0, ${-1*this.lerpY}px, 0)`

    // console.log(document.querySelectorAll('.p_item__img')[0].getBoundingClientRect().top)
    // this.items.forEach(item => {
    //   item.update(this.lerpY)
    // })

    this.reqId = requestAnimationFrame(this.update)
  }

  reset = () => {
    const height = this.target.clientHeight
    this.dummy.style.height = `${height}px`
    this.currentTargetHeight = height
  }

  destroy = () => cancelAnimationFrame(this.reqId)

}

class Item {
  ele: HTMLInputElement
  startVal: number
  endVal: number

  constructor(ele: HTMLInputElement) {
    this.ele = ele

    const rect = this.ele.getBoundingClientRect()
    this.startVal = SmoothParallax.getPageYScroll() + rect.top
    this.endVal = SmoothParallax.getPageYScroll() + rect.bottom

    console.log(this.startVal, this.endVal)
  }

  update = (scrollVal: number) => {

  }
}

export default SmoothParallax
