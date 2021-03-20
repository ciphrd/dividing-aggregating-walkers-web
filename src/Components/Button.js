import styled from "styled-components";
import { Colors } from "../Theme";

const StButton = styled.button`
  border: none;
  background: ${Colors.primary};
  cursor: pointer;
  color: white;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
  padding: 5px 8px;
  transition: all .3s ease-out;
  font-weight: bold;

  &:hover {
    transform: scale(1.03);
  }
`

function Button (props) {
  return (
    <StButton {...props}>
      {props.children}
    </StButton>
  )
}

export default Button