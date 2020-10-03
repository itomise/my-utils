"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgent = void 0;
var UserAgent = /** @class */ (function () {
    function UserAgent() {
        var _this = this;
        this.isIE = function () {
            return _this.ua.indexOf('msie') != -1 || _this.ua.indexOf('trident') != -1;
        };
        this.isFireFox = function () {
            return _this.ua.indexOf('firefox') != -1;
        };
        this.isSafari = function () {
            return _this.ua.indexOf('safari') != -1;
        };
        this.isiOS = function () {
            return (_this.ua.indexOf('iPhone') >= 0 ||
                _this.ua.indexOf('iPod') >= 0 ||
                _this.ua.indexOf('iPad') >= 0);
        };
        this.deviceType = function () {
            if (_this.ua.indexOf('iPhone') > 0 ||
                _this.ua.indexOf('iPod') > 0 ||
                (_this.ua.indexOf('Android') > 0 && _this.ua.indexOf('Mobile') > 0)) {
                return 'sp';
            }
            else if (_this.ua.indexOf('iPad') > 0 || _this.ua.indexOf('Android') > 0) {
                return 'tab';
            }
            if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
                return 'sp';
            }
            // iPad
            if (/iPad|Macintosh/i.test(navigator.userAgent) &&
                'ontouchend' in document) {
                return 'tab';
            }
            return 'pc';
        };
        this.ua = window.navigator.userAgent.toLowerCase();
    }
    return UserAgent;
}());
exports.UserAgent = UserAgent;
