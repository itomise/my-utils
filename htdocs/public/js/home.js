/*! For license information please see home.js.LICENSE */
!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=10)}({10:function(t,e,n){"use strict";n.r(e);n(2);var r=function(t){return new Promise((function(e,n){var r=new XMLHttpRequest;r.open("GET",t),r.onload=function(){4===r.readyState&&200===r.status?e(JSON.parse(r.responseText)):n(new Error(r.status))},r.onerror=function(){n(new Error(r.status))},r.send(null)}))};document.addEventListener("DOMContentLoaded",(function(){o()}));var o=function(){var t=document.querySelector(".test__image"),e=0;t.textContent=e,t.addEventListener("click",(function(){e++,t.textContent=e})),r("".concat("/public","/json/test.json")).then((function(t){document.querySelector(".test__title").textContent=t.testTitle}))}},2:function(t,e,n){}});