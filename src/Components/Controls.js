import { useState } from "react"
import styled from "styled-components"
import { useReRender } from "../hooks"
import settings from "../settings"
import { Colors } from "../Theme"
import Control from "./Controller/Control"
import NumberController from "./Controller/NumberController"


const StCont = styled.div`
`

const StSection = styled.section`
  h6 {
    align-items: center;
    font-size: 1rem;
    margin: 0;
    background: ${Colors.primaryA(0.2)};
    padding: 3px 10px;
  }

  .section-content {
    border: 2px solid ${Colors.primaryA(0.2)};
    padding: 10px;
  }
`

function Controls ({ simulation }) {
  const rerender = useReRender()

  const updateSetting = (key, value) => {
    settings[key] = value
    rerender()
  }

  return (
    <StCont>
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
        </div>
      </StSection>
    </StCont>
  )
}

export default Controls