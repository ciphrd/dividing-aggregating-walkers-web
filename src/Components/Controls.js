import { useState } from "react"
import styled from "styled-components"
import { useReRender } from "../hooks"
import settings from "../settings"
import { Colors } from "../Theme"
import Button from "./Button"
import Control from "./Controller/Control"
import NumberController from "./Controller/NumberController"
import BooleanController from "./Controller/BooleanController"
import TerminationMapController from "./Controller/TerminationMapController"


const StCont = styled.div`
  max-width: 500px;
  padding-right: 20px;
  
  @media (max-width: 1024px) {
    max-width: none;
    padding: 0 10px;
    width: 100%;
  }
`

const StSection = styled.section`
  &.buttons {
    display: grid;
    grid-template: "1fr 1fr";
    grid-gap: 15px;
    margin-bottom: 20px;
  }

  h6 {
    align-items: center;
    font-size: 1rem;
    margin: 0;
    background: ${Colors.primaryA(0.2)};
    padding: 4px 10px 3px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .section-content {
    border: 2px solid ${Colors.primaryA(0.2)};
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &:not(:last-child) {
    .section-content {
      border-bottom: none;
    }
  }
`

function Controls ({ simulation }) {
  const rerender = useReRender()

  const [envSize, setEnvSize] = useState(settings.envSize)

  const updateSetting = (key, value) => {
    settings[key] = value
    rerender()
  }

  return (
    <StCont>
      <StSection className="buttons">
        <Button onClick={() => settings.resetFn()}>
          <i className="fas fa-redo" />
          <span>Restart simulation</span>
        </Button>
        <Button onClick={() => settings.killWalkersFn()}>
          <i className="fas fa-skull" />
          <span>Kill current walkers</span>
        </Button>
        <Button onClick={() => settings.saveTextureFn()}>
          <i className="fas fa-camera"/>
          <span>Save texture</span>
        </Button>
      </StSection>

      <StSection>
        <h6>Environment</h6>
        <div className="section-content">
          <Control label="Size">
            <NumberController
              min={32}
              max={2048}
              step={32}
              value={envSize}
              onChange={setEnvSize}
              onChangeEnd={() => {
                updateSetting('envSize', envSize)
                settings.resizeFn()
              }}
              showValue={true}
              showValueFn={v => parseInt(v)}
            />
          </Control>
          <Control label="Initial walkers">
            <NumberController
              min={0}
              max={128}
              step={1}
              value={settings.nbInitialWalkers}
              onChange={value => updateSetting('nbInitialWalkers', value)}
              showValue={true}
              showValueFn={v => parseInt(v)}
            />
          </Control>
        </div>
      </StSection>

      <StSection>
        <h6>Walking</h6>
        <div className="section-content">
          <Control label="Step Size">
            <NumberController
              min={1}
              max={20}
              step={0.1}
              value={settings.stepSize}
              onChange={value => updateSetting('stepSize', value)}
              showValue={true}
            />
          </Control>
          <Control label="Turn Chances">
            <NumberController
              min={0}
              max={1}
              step={0.001}
              value={settings.turnChances}
              onChange={value => updateSetting('turnChances', value)}
              showValue={true}
            />
          </Control>
          <Control label="Turn Angle">
            <NumberController
              min={0}
              max={Math.PI}
              step={0.001}
              value={settings.turnAngle}
              onChange={value => updateSetting('turnAngle', value)}
              showValue={true}
              />
          </Control>
          <Control label="Discrete turn angle">
            <BooleanController
              value={settings.discreteTurnAngle}
              onChange={value => updateSetting('discreteTurnAngle', value)}
            />
          </Control>
        </div>
      </StSection>

      <StSection>
        <h6>Deposit</h6>
        <div className="section-content">
          <Control label="Deposit rate">
            <NumberController
              min={0}
              max={1}
              step={0.0001}
              value={settings.depositRate}
              onChange={value => updateSetting('depositRate', value)}
              showValue={true}
            />
          </Control>
        </div>
      </StSection>

      <StSection>
        <h6>Division</h6>
        <div className="section-content">
          <Control label="Division chances">
            <NumberController
              min={0}
              max={1}
              step={0.0001}
              value={settings.divisionChances}
              onChange={value => updateSetting('divisionChances', value)}
              showValue={true}
            />
          </Control>
          <Control label="Division angle">
            <NumberController
              min={0}
              max={Math.PI}
              step={0.001}
              value={settings.divisionAngle}
              onChange={value => updateSetting('divisionAngle', value)}
              showValue={true}
            />
          </Control>
          <Control label="Discrete div angle">
            <BooleanController
              value={settings.discreteDivAngle}
              onChange={value => updateSetting('discreteDivAngle', value)}
            />
          </Control>
        </div>
      </StSection>

      <StSection>
        <h6>Termination</h6>
        <div className="section-content">
          <Control label="Termination threshold">
            <NumberController
              min={0}
              max={1}
              step={0.001}
              value={settings.terminationThreshold}
              onChange={value => updateSetting('terminationThreshold', value)}
              showValue={true}
            />
          </Control>
          <Control label="Termination chances">
            <NumberController
              min={0}
              max={1}
              step={0.001}
              value={settings.terminationChances}
              onChange={value => updateSetting('terminationChances', value)}
              showValue={true}
            />
          </Control>
          <Control label="Termination map">
            <TerminationMapController 
              onChange={value => updateSetting('terminationMap', value)}
            />
          </Control>
        </div>
      </StSection>
    </StCont>
  )
}

export default Controls