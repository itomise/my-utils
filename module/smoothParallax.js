"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mathUtil_1 = require("./mathUtil");
var SmoothParallax = /** @class */ (function () {
    function SmoothParallax(target, amount, contents, dummy) {
        var _this = this;
        this.currentTargetHeight = 0;
        this.reqId = 0;
        this.items = [];
        this.style = function () {
            _this.target.style.position = 'fixed';
            _this.target.style.top = '0';
            _this.target.style.left = '0';
            _this.target.style.width = '100%';
            _this.target.style.overflow = 'hidden';
        };
        this.onScroll = function () { return _this.docY = SmoothParallax.getPageYScroll(); };
        this.update = function () {
            _this.lerpY = mathUtil_1.MathUtil.lerp(_this.lerpY, _this.docY, _this.amount);
            _this.lerpY < 0.1 ? _this.lerpY = 0 : null;
            _this.target.style.transform = "translate3d(0, " + -1 * _this.lerpY + "px, 0)";
            // console.log(document.querySelectorAll('.p_item__img')[0].getBoundingClientRect().top)
            // this.items.forEach(item => {
            //   item.update(this.lerpY)
            // })
            _this.reqId = requestAnimationFrame(_this.update);
        };
        this.reset = function () {
            var height = _this.target.clientHeight;
            _this.dummy.style.height = height + "px";
            _this.currentTargetHeight = height;
        };
        this.destroy = function () { return cancelAnimationFrame(_this.reqId); };
        this.target = document.querySelector(target);
        // heightを付与する場所をElementにするとスクロール位置がinnerのスクロール位置が保持されない
        // bodyのheightを直接指定すると解消する
        this.dummy = document.querySelector(dummy !== null && dummy !== void 0 ? dummy : 'body');
        this.reset();
        this.docY = this.lerpY = SmoothParallax.getPageYScroll();
        this.amount = amount;
        this.style();
        // this.items.push(new Item(document.querySelector('.js_smooth__item') as HTMLInputElement))
        // 1回実行しないとなぜかリロード時にスクロール位置が保持されない
        this.onScroll();
        document.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.reset);
        this.update();
    }
    SmoothParallax.getPageYScroll = function () { return window.pageYOffset || document.documentElement.scrollTop; };
    return SmoothParallax;
}());
var Item = /** @class */ (function () {
    function Item(ele) {
        this.update = function (scrollVal) {
        };
        this.ele = ele;
        var rect = this.ele.getBoundingClientRect();
        this.startVal = SmoothParallax.getPageYScroll() + rect.top;
        this.endVal = SmoothParallax.getPageYScroll() + rect.bottom;
        console.log(this.startVal, this.endVal);
    }
    return Item;
}());
exports.default = SmoothParallax;
