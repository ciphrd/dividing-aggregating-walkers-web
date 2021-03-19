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

  @media (max-width: 1024px) {
    flex-direction: column;
    max-width: 100%;
  }
`
const StSim = styled.section`
  height: 100vh;
  width: 100vh;

  @media (max-width: 1024px) {
    width: 100vw;
    height: 100vw;
    max-width: 100%;
  }
`

const StRight = styled.section`
  flex-grow: 2;

  h1 {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media (max-width: 1024px) {
    h1 {
      margin-top: 0;
      margin-left: 20px;
    }
  }
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
