"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtil = void 0;
var MathUtil = /** @class */ (function () {
    function MathUtil() {
    }
    /**
     * @param val 変換したい値
     * @param fromMin 変換前の最小値
     * @param fromMax 変換前の最大値
     * @param toMin 変換後の最小値
     * @param toMax 変換後の最大値
     */
    MathUtil.map = function (val, fromMin, fromMax, toMin, toMax) {
        if (val <= fromMin) {
            return toMin;
        }
        if (val >= fromMax) {
            return toMax;
        }
        var p = (toMax - toMin) / (fromMax - fromMin);
        return (val - fromMin) * p + toMin;
    };
    /**
     * @param start selfの値
     * @param stop targetの値
     * @param amt 係数
     */
    MathUtil.lerp = function (start, stop, amt) {
        return amt * (stop - start) + start;
    };
    return MathUtil;
}());
exports.MathUtil = MathUtil;
