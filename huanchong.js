// 缓冲运动
function move(obj, json, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        var flag = true
        for (var attr in json) { // 遍历传递的json
            var cur = 0
            if (attr === 'opacity') {
                cur = parseFloat(getStyle(obj, attr)) * 100
            } else {
                cur = parseInt(getStyle(obj, attr)) // 获取元素的属性带 px单位
            }
            var spt = ( json[attr] - cur ) / 10
            // 缓冲运动必须取整
            spt = spt > 0 ? Math.ceil(spt) : Math.floor(spt)
            if (!(cur === json[attr])) {
                flag = false
                if (attr === 'opacity') {
                    obj.style.opacity = (spt + cur) / 100  // 其他游览器
                    obj.style.filter = 'alpha(opacity:' + (spt + cur) + ')' // ie下
                } else {
                    obj.style[attr] = (spt + cur) + 'px'
                }
            }
        }
        if(flag){
            clearInterval(obj.timer)
            if (callback) callback() // 回调函数
        }
    }, 30)
}
// 获取元素样式
function getStyle(obj, property) {
    if (obj.currentStyle) { // ie下获取样式方法
        return obj.currentStyle[property]
    } else { // 其他游览器获取样式方法
        return getComputedStyle(obj, '')[property]
    }
}