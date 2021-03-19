import './App.css'
import SimContainer from './Components/SimContainer'
import styled from 'styled-components'
import Controls from './Components/Controls'
import { useRef } from 'react'

const StCont = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  gap: 20px;
`
const StSim = styled.section`
  height: 100vh;
  width: 100vh;
`

const StRight = styled.section`
  flex-grow: 2;
`

function App() {
  const simulation = useRef()

  return (
    <StCont>
      <StSim>
        <SimContainer ref={simulation} />
      </StSim>

      <StRight>
        <h1>Dividing-Aggregating Walkers</h1>
        <Controls />
      </StRight>
    </StCont>
  );
}

export default App;
