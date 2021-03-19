import { useRef, useEffect, useState } from "react"

export const useAnimationFrame = (callback) => {
  const timer = useRef(0)
  const requestRef = useRef()
  const previousTimeRef = useRef()
  
  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current
      timer.current+= deltaTime
      callback(deltaTime, timer.current)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])
}

export const useDomEvent = (elem, eventName, callback) => {
  useEffect(() => {
    elem.current.addEventListener(eventName, callback)
    return () => {
      elem.current.removeEventListener(eventName, callback)
    }
  })
} 

export const useReRender = () => {
  const [renderId, setRenderId] = useState()
  const reRender = () => {
    setRenderId(Math.random())
  }
  return reRender
}