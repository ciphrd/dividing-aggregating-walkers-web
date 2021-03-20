import { makeNoise3D } from 'open-simplex-noise'
import settings from './settings'

/**
 * The aggregation map is just a 2D perlin noise texture, with values going from 0 to 1.
 * At the termination step, the Aggregration Threshold is multiplied by the value on the aggregation map at the coordinates
 * of the agent, resulting in a different Aggregation Threshold on each area.
 */
class TerminationMap {
  /** @type {Float32Array} */
  map
  onGenerateCallbacks = []
  renderCanvas = null

  constructor () {
    this.renderCanvas = document.createElement('canvas')
  }

  generate () {
    const size = settings.envSize

    // todo: these should be moved out for user selection
    const scale = settings.terminationMap.scale / size
    const offset = settings.terminationMap.offset
    const exponent = settings.terminationMap.exponent
    const amplitude = settings.terminationMap.amplitude
    const zpos = settings.terminationMap.zpos

    this.map = new Float32Array(size*size)

    const noise2D = makeNoise3D(0)
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const i = (x + y * size)
        const value = Math.pow(noise2D(x*scale, y*scale, zpos) * amplitude + offset, exponent) // [0; 1] 
        this.map[i] = Math.min(1, Math.max(0, value))
      }
    }

    for (const onGenerate of this.onGenerateCallbacks) {
      onGenerate()
    }
  }

  registerOnGenerate = func => {
    this.onGenerateCallbacks.push(func)
  }

  unregisterOnGenerate = func => {
    const index = this.onGenerateCallbacks.indexOf(func)
    if (index > -1) {
      this.onGenerateCallbacks.splice(index, 1)
    }
  }

  draw (targetCanvas) {
    const size = settings.envSize
    this.renderCanvas.width = this.renderCanvas.height = size
    const ctx = this.renderCanvas.getContext("2d")
    const imageData = ctx.createImageData(size, size);

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        let i = (x + y * size)
        const value = this.map[i] * 255
        i*= 4
        imageData.data[i] = value
        imageData.data[i + 1] = value
        imageData.data[i + 2] = value
        imageData.data[i + 3] = 255
      }
    }
    ctx.putImageData(imageData, 0, 0)

    const targetCtx = targetCanvas.getContext('2d')
    targetCtx.drawImage(this.renderCanvas, 0, 0, targetCanvas.width, targetCanvas.height)
  }

  getValueAtIndex (idx) {
    return this.map[idx]
  } 
}

const terminationMap = new TerminationMap()

export default terminationMap