import { useEffect, useRef } from "react"
import TerminationMap from "../TerminationMap"


function TerminationMapRenderer({ size }) {
  const canvasRef = useRef()

  useEffect(() => {
    const drawTerminationMap = () => {
      TerminationMap.draw(canvasRef.current)
    }
    TerminationMap.registerOnGenerate(drawTerminationMap)
    drawTerminationMap()
    return () => {
      TerminationMap.unregisterOnGenerate(drawTerminationMap)
    }
  }, [])
  
  return (
    <canvas ref={canvasRef} width={size} height={size} />
  )
}

export default TerminationMapRenderer