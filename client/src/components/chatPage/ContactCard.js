import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 2.5rem;
    width: 90%;
    padding: 0.8rem;
    gap: 1rem;
    justify-content: space-between;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        background-color: ${({ theme }) => theme.primaryBackground};
    }
`

const UserImage = styled.img`
    height: 3rem;
    width: 3rem;
    border-radius: 5px;
`

const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
`

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`

const BoldText = styled.h4`
    color: ${({ theme }) => theme.primaryText};
    font-weight: 600;
    font-size: 1rem;
`

const Text = styled.p`
    color: ${({ theme }) => theme.secondaryText};
`

const NotificationSpan = styled.span`
    height: 1.3rem;
    width: 1.3rem;
    background-color: ${({ theme }) => theme.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`

const ContactCard = () => {
  return (
    <Container>
        <div style={{display: 'flex', gap: '1rem', overflow: 'hidden'}}>
            <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'/>
            <CenterContainer>
                <BoldText>Username</BoldText>
                <Text>Lorem idsvsvee......</Text>
            </CenterContainer>
        </div>
        <RightContainer>
            <Text>1h</Text>
            <NotificationSpan>2</NotificationSpan>
        </RightContainer>
    </Container>
  )
}

export default ContactCard
