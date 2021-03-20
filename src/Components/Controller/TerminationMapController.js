import { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../Theme";
import TerminationMapEditor from "../TerminationMapEditor";
import TerminationMapRenderer from "../TerminationMapRenderer";

const StMapContainer = styled.div`
  box-sizing: border-box;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all .3s ease-out;

  &:hover {
    border-color: ${Colors.primary};
  }
`

function TerminationMapController({ onChange }) {
  const [showEditor, setShowEditor] = useState(false)

  return (
    <>
      <StMapContainer onClick={() => setShowEditor(true)}>
        <TerminationMapRenderer size={64} />
      </StMapContainer>

      {showEditor && (
        <TerminationMapEditor 
          onClose={() => setShowEditor(false)}
          onChange={set => onChange(set)}
        />
      )}
    </>
  )
}

export default TerminationMapController