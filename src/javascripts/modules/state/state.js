import { UserAgent } from '../../../../module/userAgent'

export const state = {
  isIE: undefined,
  deviceType: undefined,
  windowSizeType: undefined,
  breakPoint: {
    sp: 750,
    tab: 950,
  },
}

export const stateInit = () => {
  const ua = new UserAgent()

  state.isIE = ua.isIE()

  state.deviceType = ua.deviceType()

  onResize()
  window.addEventListener('resize', onResize)
}

const onResize = () => {
  const sw = window.innerWidth
  if (sw < state.breakPoint.sp) {
    state.windowSizeType = 'sp'
  } else if (sw < state.breakPoint.tab) {
    state.windowSizeType = 'tab'
  } else {
    state.windowSizeType = 'pc'
  }
}
