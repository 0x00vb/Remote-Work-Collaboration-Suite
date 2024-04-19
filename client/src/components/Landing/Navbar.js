import React from 'react'
import styled from 'styled-components'

import AppIcon from '../../assets/favicon-32x32.png';

const Container = styled.nav`
    position: sticky;
    top: 15px;
    width: 90%;
    height: 3rem;
    background-color:  ${({ theme }) => theme.secondaryBackground};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 5px 25px;
    border-radius: 10px;
    -webkit-box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.1);
    -moz-box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.1);
    box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.1);
`

const SubContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`

const AppIconContainer = styled.img`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
`

const Text = styled.p`
    color: ${({ theme }) => theme.primaryText};
    font-size: 17px;
    cursor: pointer;
    ${({ additionalStyles }) => additionalStyles && additionalStyles};
`

const Navbar = ({ setLoginVisible }) => {
  return (
    <Container>
        <SubContainer>
            <AppIconContainer src={AppIcon}/>
            <Text>Home</Text>
            <Text>Get Started</Text>
            <Text>Features</Text>
        </SubContainer>
        <SubContainer>
            <Text
                additionalStyles={`
                    background-color: #212121;
                    color: #F7F7F9;
                    padding: 10px;
                `}
                onClick={setLoginVisible}
            >
                LOG IN
            </Text>
        </SubContainer>
    </Container>
  )
}

export default Navbar
