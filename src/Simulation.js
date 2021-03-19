import AggregationMap from "./AggregationMap"
import settings from "./settings"
import { getTorusPos, prob } from "./utils"
import Walker from "./Walker"

class Simulation {
  canvas
  /** @type {CanvasRenderingContext2D} */
  ctx
  walkers
  aggMap

  constructor (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.aggMap = new AggregationMap()
  }

  init () {
    this.walkers = []
    for (let i = 0; i < settings.nbInitialWalkers; i++) {
      // distribute the walkers in circle
      let da = i / settings.nbInitialWalkers * Math.PI * 2
      let x = Math.cos(da) * settings.envSize * .5 + settings.envSize * .5
      let y = Math.sin(da) * settings.envSize * .5 + settings.envSize * .5
      let a = Math.random() * Math.PI * 2
      this.walkers.push(
        new Walker(x, y, a)
      )
    }
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.aggMap.generate()
    this.aggMap.draw()
  }

  deposit (walker) {
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${settings.depositRate})`
    this.ctx.lineWidth = 1
    
    // if the line is too long (because of torus world), we shorthen it
    const lenSq = (walker.pos.x-walker.lastPos.x)*(walker.pos.x-walker.lastPos.x) + (walker.pos.y-walker.lastPos.y)*(walker.pos.y-walker.lastPos.y)

    if (lenSq < 16*settings.stepSize*settings.stepSize) {
      this.ctx.beginPath()
      this.ctx.moveTo(walker.lastPos.x, walker.lastPos.y)
      this.ctx.lineTo(walker.pos.x, walker.pos.y)
      this.ctx.stroke()
    }
  }

  update (addWalkers = true) {
    const newWalkers = []
    
    for (const w of this.walkers) {
      // 1. walking step
      w.update()
      
      // 2. division step
      if (addWalkers) {
        if (prob(settings.divisionChances)) {
          let ra = Math.random()
          if (settings.discreteDivAngle) ra = Math.round(ra)
          ra = ra * 2 - 1
          const nw = new Walker(w.pos.x, w.pos.y, w.ang + ra * settings.divisionAngle)
          newWalkers.push(nw)
        }
      }

      // 3. deposit step
      this.deposit(w)
    }

    // 4. termination step
    const env = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    for (let i = this.walkers.length-1; i >= 0; i--) {
      const w = this.walkers[i]

      // test for random termination chances
      if (prob(settings.terminationChances*settings.divisionChances)) {
        this.walkers.splice(i, 1)
        continue
      }

      // turn walker coordinates into discrete coordinate to sample the environment
      // the "future" position of the walker is used for that purpose
      const dx = Math.cos(w.ang)
      const dy = Math.sin(w.ang)
      const fpos = getTorusPos({ 
        x: w.pos.x + dx * settings.stepSize * 2, 
        y: w.pos.y + dy * settings.stepSize * 2 
      })
      fpos.x = fpos.x|0
      fpos.y = fpos.y|0

      // samples the r color of the aggregate
      const idx = ((fpos.x + fpos.y * settings.envSize)|0) * 4
      const aggreg = env.data[idx]
      if (aggreg > settings.terminationThreshold*255 * this.aggMap.getValueAtIndex(idx/4)) {
        this.walkers.splice(i, 1)
        // draw its last step to fill the gap
        w.lastPos = w.pos
        w.pos = fpos
        this.deposit(w)
      }
    }

    // adds the new walkers to the active list
    this.walkers = this.walkers.concat(newWalkers)
  }
}

export default Simulation