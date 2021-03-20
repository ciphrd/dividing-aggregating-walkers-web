import settings from "./settings"

export const prob = x => Math.random() < x

export const downloadURI = (uri, name) => {
  var link = document.createElement("a")
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  link.remove()
}

export const getTorusPos = ({ x, y }) => {
  if (x < 0) x = settings.envSize + x
  if (x > settings.envSize) x %= settings.envSize
  if (y < 0) y = settings.envSize + y
  if (y > settings.envSize) y = y %= settings.envSize
  return { x, y }
}