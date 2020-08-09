// youtube api の追加
const tag = document.createElement('script')
tag.src = '//www.youtube.com/iframe_api'
const main_js = document.getElementById('__main_js')
main_js.parentNode.insertBefore(tag, main_js)
