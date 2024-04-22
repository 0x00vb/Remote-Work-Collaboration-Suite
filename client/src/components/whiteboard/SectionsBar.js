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
  padding: 0.5rem;
  background-color: ${({ id, theme,  currentWbSection }) =>
    id === currentWbSection ? theme.primaryBackground : 'transparent'};
    border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  -webkit-box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.1);
  -moz-box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.1);
  box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.1);
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
      <ItemContainer  id='members' onClick={() => setCurrentWbSection('members')} currentWbSection={currentWbSection}>
        <Text>Members</Text>
      </ItemContainer>
      <ItemContainer  id='files' onClick={() => setCurrentWbSection('files')} currentWbSection={currentWbSection}>
        <Text>Files (6)</Text>
      </ItemContainer>
    </Container>
  )
}

export default SectionsBar
