import styled from "styled-components"


const StControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  .label {
    width: 200px;

    @media (max-width: 1024px) {
      width: 30%;
    }
  }
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