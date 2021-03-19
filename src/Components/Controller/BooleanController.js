import styled from "styled-components"
import { Colors } from "../../Theme"

const StCheckboxCont = styled.div`
  /* Customize the label (the container) */
  .container {
    display: block;
    position: relative;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    border: 1px solid rgba(255, 255, 255, 0.7);
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: ${Colors.primary};
    border-color: transparent;
  }

  .container:hover input:checked ~ .checkmark {
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 5px;
    top: 2px;
    width: 3px;
    height: 7px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

function BooleanController({ value, onChange }) {
  return (
    <StCheckboxCont>
      <label className="container">
        <input 
          type="checkbox" 
          checked={value}
          onChange={() => onChange(!value)}
        />
        <span className="checkmark"></span>
      </label>
    </StCheckboxCont>
  )
}

export default BooleanController