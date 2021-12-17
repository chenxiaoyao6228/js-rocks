var tween = {
  linear: function(t, b, c, d) {
    return (c * t) / d + b
  },
  easeIn: function(t, b, c, d) {
    return c * (t /= d) * t + b
  },
  strongEaseIn: function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b
  },
  strongEaseOut: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  sineaseIn: function(t, b, c, d) {
    return c * (t /= d) * t * t + b
  },
  sineaseOut: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  }
}

var Animate = function(dom) {
  this.dom = dom // 进行运动的 dom 节点
  this.startTime = 0 // 动画开始时间
  this.startPos = 0 // 动画开始时,dom 节点的位置,即 dom 的初始位置
  this.endPos = 0 // 动画结束时,dom 节点的位置,即 dom 的目标位置
  this.propertyName = null // dom 节点需要被改变的 css 属性名
  this.easing = null // 缓动算法
  this.duration = null // 动画持续时间
}

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
  this.startTime = +new Date() // 动画启动时间
  this.startPos = this.dom.getBoundingClientRect()[propertyName] // dom 节点初始位置
  this.propertyName = propertyName // dom 节点需要被改变的 CSS 属性名
  this.endPos = endPos // dom 节点目标位置
  this.duration = duration // 动画持续事件
  this.easing = tween[easing] // 缓动算法
  var self = this
  var timeId = setInterval(function() {
    // 启动定时器,开始执行动画
    if (self.step() === false) {
      // 如果动画已结束,则清除定时器
      clearInterval(timeId)
    }
  }, 19)
}

Animate.prototype.step = function() {
  var t = +new Date() // 取得当前时间
  if (t >= this.startTime + this.duration) {
    this.update(this.endPos) // 更新小球的 CSS 属性值
    return false
  }
  var pos = this.easing(
    t - this.startTime,
    this.startPos,
    this.endPos - this.startPos,
    this.duration
  ) // pos 为小球当前位置
  this.update(pos) // 更新小球的 CSS 属性值
}

Animate.prototype.update = function(pos) {
  this.dom.style[this.propertyName] = pos + 'px'
}

var animate = new Animate(document.querySelector('#div'))
animate.start('left', 1000, 1000, 'linear')
