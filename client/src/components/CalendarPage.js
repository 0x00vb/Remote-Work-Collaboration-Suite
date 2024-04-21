import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
        width: 100%;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color:  ${({ theme }) => theme.secondaryBackground};
    border-radius: 10px;
    margin: 1rem 0.5rem;
`

const CalendarPage = () => {
  return (
    <Container>
      
    </Container>
  )
}

export default CalendarPage
