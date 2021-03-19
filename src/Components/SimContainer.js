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
  const isMouseDown = useRef()
  const mouse = useRef()

  const resize = () => {
    const cvs = canvasRef.current
    cvs.width = cvs.height = settings.envSize  
    simulation.current.init()
  }

  useEffect(() => {
    const cvs = canvasRef.current
    cvs.width = cvs.height = settings.envSize
    simulation.current = new Simulation(cvs)
    simulation.current.init()
    ref.current = simulation.current

    settings.killWalkersFn = simulation.current.killAllWalkers
    settings.resetFn = simulation.current.init
    settings.resizeFn = resize
  }, [])

  useAnimationFrame((dt) => {
    if (isMouseDown.current) {
      simulation.current.addWalker(mouse.current.x*settings.envSize, mouse.current.y*settings.envSize, Math.random()*Math.PI*2)
    }

    simulation.current.update(dt < 30)
  })

  const onMouseMove = event => {
    const cvs = canvasRef.current
    const bounds = canvasRef.current.getBoundingClientRect()
    const dx = (event.clientX - bounds.x) / bounds.width
    const x = (event.clientX - bounds.x) / bounds.width
    const y = (event.clientY - bounds.y) / bounds.height
    mouse.current = { x, y }
  }

  return (
    <StContainer>
      <canvas 
        ref={canvasRef}
        onMouseDown={() => isMouseDown.current = true}
        onMouseMove={onMouseMove}
        onMouseUp={() => isMouseDown.current = false}
        onMouseLeave={() => isMouseDown.current = false}
      />
    </StContainer>
  )
})

export default SimContainer