import styled from "styled-components"
import { Colors } from "../../Theme"


const SLIDER_HEIGHT = 5

const StSliderContainer = styled.div`
  width: 200px;
  background: rgba(255, 255, 255, 0.4);
  position: relative;
  height: ${SLIDER_HEIGHT}px;

  @media (max-width: 1024px) {
    flex-grow: 2;
    width: auto;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.value*100}%;
    background: ${Colors.primary};
    pointer-events: none;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: -5px;
    left: ${props => props.value*100}%;
    height: ${SLIDER_HEIGHT+10}px;
    width: 4px;
    background: white;
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  input {
    position: absolute;
    top: -10px;
    left: 0;
  }
`

const StSlider = styled.input.attrs(props => ({
  type: 'range'
}))`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  cursor: pointer;
  height: ${SLIDER_HEIGHT+20}px;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    border: none;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;
    width: 0;
  }
`

function NumberController ({ min, max, step, value, onChange, onChangeEnd, showValue, showValueFn }) {
  return (
    <>
      <StSliderContainer value={(value-min)/(max-min)}>
        <StSlider
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={event => onChange(parseFloat(event.target.value))}
          onMouseUp={() => onChangeEnd && onChangeEnd()}
        />
      </StSliderContainer>

      {showValue && (showValueFn ? showValueFn(value) : value.toFixed(3))}
    </>
  )
}

export default NumberController