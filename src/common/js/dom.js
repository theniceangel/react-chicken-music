export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ` ${cls}`
  }
}

export function hasClass (ele, cls) {
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
