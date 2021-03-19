import { forwardRef, useEffect, useRef } from "react"
import styled from "styled-components"
import { useAnimationFrame } from "../hooks"
import settings from "../settings"
import Simulation from "../Simulation"


const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    max-width: 100%;
    max-height: 100%;
  }
`

const SimContainer = forwardRef((props, ref) => {
  const canvasRef = useRef()
  const simulation = useRef()

  useEffect(() => {
    const cvs = canvasRef.current
    cvs.width = cvs.height = settings.envSize
    simulation.current = new Simulation(cvs)
    simulation.current.init()
    settings.resetFn = simulation.current.init
    ref.current = simulation.current
  }, [])

  useAnimationFrame((dt) => {
    console.log(dt)
    simulation.current.update(dt < 30)
  })

  return (
    <StContainer>
      <canvas 
        ref={canvasRef}
      />
    </StContainer>
  )
})

export default SimContainer