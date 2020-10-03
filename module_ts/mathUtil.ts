class MathUtil {
  /**
   * @param val 変換したい値
   * @param fromMin 変換前の最小値
   * @param fromMax 変換前の最大値
   * @param toMin 変換後の最小値
   * @param toMax 変換後の最大値
   */
  static map = (val: number, fromMin: number, fromMax: number, toMin: number, toMax: number,) => {
    if (val <= fromMin) {
      return toMin
    }
    if (val >= fromMax) {
      return toMax
    }
    const p = (toMax - toMin) / (fromMax - fromMin)
    return (val - fromMin) * p + toMin
  }

  /**
   * @param start selfの値
   * @param stop targetの値
   * @param amt 係数
   */
  static lerp = (start: number, stop: number, amt: number) => {
    return amt * (stop - start) + start
  }


}

export { MathUtil }
