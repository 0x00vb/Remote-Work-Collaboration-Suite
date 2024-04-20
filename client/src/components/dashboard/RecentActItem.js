import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    gap: 7px;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
`

const Text = styled.div`
    font-size: ${props => props.fs ? props.fs : '16px'};
    color: ${({ theme }) => theme.secondaryText};
`

const Span = styled.span`
    color: ${({ theme }) => theme.secondaryText};
    font-size: 26px;
    font-weight: 800;
`

const RecentActItem = () => {
  return (
    <Container>
        <Span>#</Span>
        <TextContainer>
            <Text>New Task assigned</Text>
            <Text fs={'14px'}>3 days ago.</Text>
        </TextContainer>
    </Container>
  ) 
}

export default RecentActItem