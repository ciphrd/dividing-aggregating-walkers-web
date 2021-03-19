import styled from "styled-components"


const StControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`

function Control({ label, children }) {
  return (
    <StControl>
      <span className="label">{ label }</span>
      {children}
    </StControl>
  )
}

export default Control