function onLoadEvent(fn) {
  var load = window.onload
  if (typeof load === 'function') {
    window.onload = function () {
      load()
      fn()
    }
  } else {
    window.onload = fn
  }
}

function moveElement(id, xDest, yDest, interval) {
  var ele = document.getElementById(id)
  if (!ele)  return false

  var xpos = parseInt(ele.style.left) || 0
  var ypos = parseInt(ele.style.top) || 0

  if (xpos === xDest && ypos === yDest) {
    return true
  }

  if (xpos < xDest) xpos += Math.ceil((xDest - xpos) / 10)
  if (xpos > xDest) xpos -= Math.ceil((xpos - xDest) / 10)

  if (ypos < yDest) ypos += Math.ceil((yDest - ypos) / 10)
  if (ypos > yDest) ypos -= Math.ceil((ypos - yDest) / 10)

  ele.style.left = xpos + 'px'
  ele.style.top = ypos + 'px'

  setTimeout(function () {
    moveElement(id, xDest, yDest, interval)
  }, interval)
}

onLoadEvent(function () {
  var id = 'message'
  var ele = document.getElementById(id)
  if (!ele) return
  ele.style.left = '50px'
  ele.style.top = '100px'

  moveElement(id, 125, 25, 20)
})


onLoadEvent(function () {
  var id2 = 'message2'
  var ele2 = document.getElementById(id2)

  if (!ele2) return
  ele2.style.left = '50px'
  ele2.style.top = '50px'

  moveElement(id2, 125, 75, 20)
})
