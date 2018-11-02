/* 重置字体大小 */
(function (doc, win) {
    let docEle = doc.documentElement,
        evt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        fn = function () {
            let width = docEle.clientWidth
            width && (docEle.style.fontSize = (width / 7.5) + 'px')
        }
    win.addEventListener(evt, fn, false)
    doc.addEventListener('DOMContentLoaded', fn, false)
}(document, window))

/* 横竖屏切换刷新 */
window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
    if (window.orientation === 180 || window.orientation === 0) {
       location.replace(location.href)
    }
	if (window.orientation === 90 || window.orientation === -90) {
        location.replace(location.href)
    }
}, false)
