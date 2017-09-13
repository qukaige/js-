
function move(obj, json, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        var flag = true
        for (var attr in json) { 
            var cur = 0
            if (attr === 'opacity') {
                cur = parseFloat(getStyle(obj, attr)) * 100
            } else {
                cur = parseInt(getStyle(obj, attr)) 
            }
            var spt = ( json[attr] - cur ) / 10
            spt = spt > 0 ? Math.ceil(spt) : Math.floor(spt)
            if (!(cur === json[attr])) {
                flag = false
                if (attr === 'opacity') {
                    obj.style.opacity = (spt + cur) / 100  
                    obj.style.filter = 'alpha(opacity:' + (spt + cur) + ')' // ie下
                } else {
                    obj.style[attr] = (spt + cur) + 'px'
                }
            }
        }
        if(flag){
            clearInterval(obj.timer)
            if (callback) callback() 
        }
    }, 30)
}

function getStyle(obj, property) {
    if (obj.currentStyle) { 
        return obj.currentStyle[property]
    } else { 
        return getComputedStyle(obj, '')[property]
    }
}