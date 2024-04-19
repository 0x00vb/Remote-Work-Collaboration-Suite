import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Landing/Navbar';
import Login from '../components/Landing/Login';

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color:  ${({ theme }) => theme.primaryBackground};
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const SubContainer = styled.div`
    height: 80%;
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 5px 25px;
`

const ContentContainer = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    padding: 0 30px;
`

const Title = styled.p`
    font-size: 72px;
    font-weight: 600;
`

const Text = styled.p`
    font-size: 20px;
    ${({ additionalStyles }) => additionalStyles && additionalStyles};
`

const Landing = () => {
    const [loginVisible, setLoginVisible] = useState(false);

    const handleShowLogin = () => {
        setLoginVisible(!loginVisible);
    }

    return (
    <Container>
        <Navbar setLoginVisible={setLoginVisible}/>
        <SubContainer>
            <ContentContainer>
                <Title>Remote work tool</Title>
                <Text>Unify your team, amplify productivity – with TeamSync, collaboration has never been easier.</Text>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Text
                        additionalStyles={`
                            background-color: #212121;
                            color: #F7F7F8;
                            padding: 12px;
                            cursor: pointer;
                        `}
                    >
                        Get started
                    </Text>
                    <Text additionalStyles={`font-size: 14px`}>IT'S FREE</Text>
                </div>
            </ContentContainer>
            <ContentContainer>
                <Text
                    additionalStyles={`
                        line-height: 1.8;
                    `}
                >
                    Welcome to TeamSync – your ultimate hub for remote collaboration. Streamline project management, share files seamlessly, conduct crystal-clear video conferences, and keep the conversation flowing with real-time messaging. Work smarter, together.
                </Text>
            </ContentContainer>
        </SubContainer>
        {
            loginVisible && (
                <Login setLoginVisible={setLoginVisible}/>
            )
        }
    </Container>
    )
}

export default Landing
