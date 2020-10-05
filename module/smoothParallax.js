"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mathUtils_1 = require("./mathUtils");
var SmoothParallax = /** @class */ (function () {
    function SmoothParallax(target, ease, contents, dummy) {
        var _this = this;
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
            _this.lerpY = mathUtils_1.MathUtils.lerp(_this.lerpY, _this.docY, _this.ease);
            _this.lerpY < 0.1 ? _this.lerpY = 0 : null;
            _this.target.style.transform = "translate3d(0, " + -1 * _this.lerpY + "px, 0)";
            _this.items.forEach(function (item) {
                item.update();
            });
            _this.reqId = requestAnimationFrame(_this.update);
        };
        this.reset = function () {
            var height = _this.target.scrollHeight;
            _this.dummy.style.height = height + "px";
        };
        this.destroy = function () { return cancelAnimationFrame(_this.reqId); };
        this.target = document.querySelector(target);
        // heightを付与する場所をElementにするとスクロール位置がinnerのスクロール位置が保持されない
        // bodyのheightを直接指定すると解消する
        this.dummy = document.querySelector(dummy !== null && dummy !== void 0 ? dummy : 'body');
        this.reset();
        var scrollY = SmoothParallax.getPageYScroll();
        this.docY = this.lerpY = scrollY;
        this.ease = ease;
        this.style();
        // 1回実行しないとなぜかリロード時にスクロール位置が保持されない
        this.onScroll();
        document.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', function () { return _this.reset(); });
        this.update();
        if (contents) {
            contents.forEach(function (content) {
                var nodes = document.querySelectorAll(content.wrap);
                for (var i = 0; nodes[i]; i++) {
                    if (nodes[i]) {
                        var node = nodes[i];
                        _this.items.push(new Item(node, content.min, content.max, content.isRandom));
                    }
                }
            });
        }
    }
    SmoothParallax.getPageYScroll = function () { return window.pageYOffset || document.documentElement.scrollTop; };
    return SmoothParallax;
}());
var Item = /** @class */ (function () {
    function Item(wrap, min, max, isRandom) {
        var _this = this;
        this.winHeight = 0;
        this.isVisible = false;
        this.update = function () {
            var rect = _this.wrap.getBoundingClientRect();
            var startPos = -1 * (rect.top - _this.winHeight);
            var endPos = rect.height + _this.winHeight;
            var per = mathUtils_1.MathUtils.map(startPos, 0, endPos, 0, 1);
            _this.wrap.style.transform = "translate3d(0, " + mathUtils_1.MathUtils.map(per, 0, 1, _this.min, _this.max) + "px, 0)";
            //TODO: isVisibleの処理が無駄なので最適化
            var top = rect.top < _this.winHeight;
            var bottom = rect.bottom > 0;
            _this.isVisible = top && bottom;
        };
        this.reset = function () {
            _this.winHeight = window.innerHeight;
        };
        this.wrap = wrap;
        //TODO: min maxをランダムで調整できるように機能追加する
        this.min = min;
        this.max = max;
        this.reset();
        window.addEventListener('resize', function () { return _this.reset(); });
    }
    return Item;
}());
exports.default = SmoothParallax;
