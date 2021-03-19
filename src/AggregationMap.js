import { makeNoise3D } from 'open-simplex-noise'
import settings from './settings'

/**
 * The aggregation map is just a 2D perlin noise texture, with values going from 0 to 1.
 * At the termination step, the Aggregration Threshold is multiplied by the value on the aggregation map at the coordinates
 * of the agent, resulting in a different Aggregation Threshold on each area.
 */
class AggregationMap {
  /** @type {Float32Array} */
  map

  constructor () {}

  generate () {
    const size = settings.envSize

    // todo: these should be moved out for user selection
    const scale = 3 / size
    const offset = .7
    const exponent = 1.5
    const amplitude = .3
    const zpos = 0

    this.map = new Float32Array(size*size)

    const noise2D = makeNoise3D(Date.now())
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const i = (x + y * size)
        const value = Math.pow(noise2D(x*scale, y*scale, zpos) * amplitude + offset, exponent) // [0; 1] 
        this.map[i] = value
      }
    }
  }

  draw () {
    const size = settings.envSize
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext("2d")
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

    document.body.append(canvas)
  }

  getValueAtIndex (idx) {
    return this.map[idx]
  } 
}

export default AggregationMap