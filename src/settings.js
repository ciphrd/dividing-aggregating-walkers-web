export default {
  envSize: 512,
  nbInitialWalkers: 10,

  // walking step
  stepSize: 1.0,
  turnChances: 0.03,
  turnAngle: 0.4,
  discreteTurnAngle: true,

  // deposit step
  depositRate: .1,

  // division step
  divisionChances: 0.1,
  divisionAngle: Math.PI / 4,
  discreteDivAngle: false,

  // termination step
  terminationThreshold: 0.9,
  terminationChances: 0.8,    // * division chances

  // fast hack to have the reset fn global 
  resetFn: null,
  resizeFn: null,
  killWalkersFn: null,
}