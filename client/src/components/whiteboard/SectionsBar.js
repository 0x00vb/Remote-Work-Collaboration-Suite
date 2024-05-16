import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  height: 2rem;
  padding: 0.2rem;
  margin-right: 1rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border-radius: 10px;
`

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${({ id, theme,  currentWbSection }) =>
    id === currentWbSection ? theme.primaryBackground : 'transparent'};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  ${props => props.currentWbSection === props.id && 'box-shadow: 2px 1px 3px 0px rgba(0,0,0,0.2);'};

`

const Text = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.primaryText};
`

const SectionsBar = ({currentWbSection, setCurrentWbSection}) => {
  return (
    <Container>
      <ItemContainer id='board' onClick={() => setCurrentWbSection('board')} currentWbSection={currentWbSection}>
        <Text>Board</Text>
      </ItemContainer>
      <ItemContainer  id='files' onClick={() => setCurrentWbSection('files')} currentWbSection={currentWbSection}>
        <Text>Files (6)</Text>
      </ItemContainer>
    </Container>
  )
}

export default SectionsBar
