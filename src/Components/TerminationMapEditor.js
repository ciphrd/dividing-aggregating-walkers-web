import styled from "styled-components"
import TerminationMap from "../TerminationMap"
import settings from "../settings"
import { Colors } from "../Theme"
import Control from "./Controller/Control"
import NumberController from "./Controller/NumberController"
import TerminationMapRenderer from "./TerminationMapRenderer"

const StCont = styled.div`
  position: fixed;
  z-index: 11;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background: ${Colors.background};
  flex-direction: row;
  gap: 20px;

  .close {
    position: absolute;
    top: 0; right: 0;
    padding: 20px;
    cursor: pointer;
    opacity: 0.5;
    transition: all .3s ease-out;

    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    top: 0; bottom: 0;
    left: 0; right: 0;
    overflow: auto;
    transform: none;
  }
`

const StCover = styled.div`
  position: fixed;
  z-index: 10;
  top: 0; bottom: 0;
  left: 0; right: 0;
  background: rgba(0, 0, 0, 0.4);
`

const StControls = styled.div`
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  h3 {
    margin-bottom: 20px;
  }

  @media (max-width: 1024px) {
    padding: 20px;
  }
`

function TerminationMapEditor({ onClose, onChange }) {
  const updateSetting = (key, value) => {
    const newSettings = {
      ...settings.terminationMap,
      [key]: value
    }
    onChange(newSettings)
    TerminationMap.generate()
  }

  return (
    <>
      <StCover onClick={onClose} />
      <StCont>
        <TerminationMapRenderer size={400} />
        <StControls>
          <h3>Termination map Editor</h3>
          <Control label="Scale">
            <NumberController
              min={0}
              max={10}
              step={0.01}
              value={settings.terminationMap.scale}
              onChange={value => updateSetting('scale', value)}
            />
          </Control>
          <Control label="Amplitude">
            <NumberController
              min={0}
              max={1.0}
              step={0.01}
              value={settings.terminationMap.amplitude}
              onChange={value => updateSetting('amplitude', value)}
            />
          </Control>
          <Control label="Offset">
            <NumberController
              min={0}
              max={1}
              step={0.01}
              value={settings.terminationMap.offset}
              onChange={value => updateSetting('offset', value)}
            />
          </Control>
          <Control label="Exponent">
            <NumberController
              min={0}
              max={4}
              step={0.01}
              value={settings.terminationMap.exponent}
              onChange={value => updateSetting('exponent', value)}
            />
          </Control>
          <Control label="Z-offset">
            <NumberController
              min={0}
              max={10}
              step={0.1}
              value={settings.terminationMap.zpos}
              onChange={value => updateSetting('zpos', value)}
            />
          </Control>
        </StControls>
        <i className="fas fa-times close" onClick={onClose} />
      </StCont>
    </>
  )
}

export default TerminationMapEditor