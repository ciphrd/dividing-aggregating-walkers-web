import settings from "./settings"

export const prob = x => Math.random() < x

export const getTorusPos = ({ x, y }) => {
  if (x < 0) x = settings.envSize + x
  if (x > settings.envSize) x %= settings.envSize
  if (y < 0) y = settings.envSize + y
  if (y > settings.envSize) y = y %= settings.envSize
  return { x, y }
}