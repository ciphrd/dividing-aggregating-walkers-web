import { useEffect, useRef } from "react"
import { useAnimationFrame } from "../hooks"
import settings from "../settings"
import Simulation from "../Simulation"


function SimContainer () {
  const canvasRef = useRef()
  const simulation = useRef()

  useEffect(() => {
    const cvs = canvasRef.current
    cvs.width = cvs.height = settings.envSize
    simulation.current = new Simulation(cvs)
    simulation.current.init()
    settings.resetFn = simulation.current.init
  }, [])

  useAnimationFrame((dt) => {
    console.log(dt)
    simulation.current.update(dt < 30)
  })

  return (
    <canvas 
      ref={canvasRef}
    />
  )
}

export default SimContainer