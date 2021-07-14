var myImage = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()
myImage.setSrc(
  'https://images.pexels.com/photos/8416919/pexels-photo-8416919.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
)
