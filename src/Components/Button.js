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
  flex-direction: row;
  gap: 10px;
  padding: 5px 8px;
  margin-bottom: 10px;
  transition: all .3s ease-out;

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