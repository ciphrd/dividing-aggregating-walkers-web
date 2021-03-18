import settings from "./settings"
import { prob, getTorusPos } from "./utils"


class Walker {
  pos
  lastPos
  ang

  constructor (x, y, ang) {
    this.pos = { x, y }
    this.lastPos = { x, y }
    this.ang = ang
  }

  update () {
    // mem last pos (no need to copy object since a copy will be made just after)
    this.lastPos = this.pos

    // the walker has some random chances to turn
    if (prob(settings.turnChances)) {
      let ra = Math.random()
      if (settings.discreteTurnAngle) {
        ra = Math.round(ra)
      }
      ra = ra * 2 - 1
      this.ang+= ra * settings.turnAngle
    }

    // move step: the walker moves along its direction, defined by its angle
    const mx = Math.cos(this.ang) * settings.stepSize
    const my = Math.sin(this.ang) * settings.stepSize
    this.pos = getTorusPos({ x: this.pos.x + mx, y: this.pos.y + my })
  }
}

export default Walker