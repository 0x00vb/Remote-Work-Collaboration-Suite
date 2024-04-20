import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

import Navbar from '../components/Landing/Navbar';
import Login from '../components/Landing/Login';

import LandingImage from '../assets/landingImage.png';
import Icon from '../components/GoogleIcon';

const Container = styled.div`
    background-color:  ${({ theme }) => theme.primaryBackground};
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const Section = styled.div`
    height: 100vh;
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 5px 25px;
`

const ContentContainer = styled.div`
    height: 80%;
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

const Image = styled.img`   
    height: 100%;
`

const CardsGrid = styled.div`
    height: 60%;
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    grid-template-rows: repeat(2, 1fr); 
    gap: 20px; 
`

const CardContainer = styled.div`
    width: 15rem;
    max-height: 2750px;
    display: flex;
    flex-direction: column;
    padding: 10PX 15px;
    gap: 5px;
`

const Landing = () => {
    const [loginVisible, setLoginVisible] = useState(false);

    const handleShowLogin = () => {
        setLoginVisible(!loginVisible);
    }

    return (
    <Container>
        <Navbar setLoginVisible={setLoginVisible} scroll={scroll} scrollSpy={scrollSpy}/>
        <Section id='home'>
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
                <Image src={LandingImage}/>
                <Text
                    additionalStyles={`
                        line-height: 1.8;
                    `}
                >
                    Welcome to TeamSync – your ultimate hub for remote collaboration. Streamline project management, share files seamlessly, conduct crystal-clear video conferences, and keep the conversation flowing with real-time messaging. Work smarter, together.
                </Text>
            </ContentContainer>
        </Section>
        {
            loginVisible && (
                <Login setLoginVisible={setLoginVisible}/>
            )
        }
        <Section id='features' style={{alignItems: 'center'}}>
            <ContentContainer>
                <Text
                    additionalStyles={
                        `font-size: 1.4rem;
                        font-weight: 600;
                        `
                    }
                >
                    Features
                </Text>
                <Text additionalStyles={`
                    font-size: 1.5rem;
                    font-weight: 600;
                `}>
                    Revolutionize the way your team collaborates with our suite of powerful tools:
                </Text>
                <Text additionalStyles={`font-size: 18px; color: #858484`}>
                    Say goodbye to scattered communication channels and disjointed workflows. With TeamSync, your team can work together effortlessly, no matter where they are located.
                </Text>
            </ContentContainer>
            <CardsGrid>
                    <CardContainer>
                        <Icon name={'groups'} color={'#000000'} styles={`font-size: 3rem`}/>
                        <Text
                            additionalStyles={`font-size: 1.5rem; font-weight: 600`}
                        >Project Management</Text>
                        <Text
                            additionalStyles={`font-size: 1rem; color: #7e7e7e`}
                        >Streamline your workflow from start to finish. Create projects, assign tasks, and track progress with ease. Visualize your project's journey with Kanban boards and Gantt charts.</Text>
                    </CardContainer>
                    <CardContainer>
                        <Icon name={'folder_open'} color={'#000000'} styles={`font-size: 3rem`}/>
                        <Text
                            additionalStyles={`font-size: 1.5rem; font-weight: 600`}
                        >File Sharing</Text>
                        <Text
                            additionalStyles={`font-size: 1rem; color: #7e7e7e`}
                        >Collaborate in real-time with secure file sharing. Ensure everyone is on the same page with version control, comments, and annotation tools. Say goodbye to email attachments and scattered documents.</Text>
                    </CardContainer>
                    <CardContainer>
                        <Icon name={'videocam'} color={'#000000'} styles={`font-size: 3rem`}/>
                        <Text
                            additionalStyles={`font-size: 1.5rem; font-weight: 600`}
                        >Video Conferencing</Text>
                        <Text
                            additionalStyles={`font-size: 1rem; color: #7e7e7e`}
                        >Connect face-to-face with crystal-clear video and audio. Share your screen, record meetings, and customize your virtual background for a professional touch. Bridge the gap between remote team members effortlessly.</Text>
                    </CardContainer>
                    <CardContainer>
                        <Icon name={'chat'} color={'#000000'} styles={`font-size: 3rem`}/>
                        <Text
                            additionalStyles={`font-size: 1.5rem; font-weight: 600`}
                        >Team Chat</Text>
                        <Text
                            additionalStyles={`font-size: 1rem; color: #7e7e7e`}
                        >Keep the conversation flowing with real-time messaging. Organize discussions into channels, share files, and never miss an important message with powerful search functionality. Communication made simple.</Text>
                    </CardContainer>
                    <CardContainer>
                        <Icon name={'assignment'} color={'#000000'} styles={`font-size: 3rem`}/>
                        <Text
                            additionalStyles={`font-size: 1.5rem; font-weight: 600`}
                        >Virtual Whiteboard</Text>
                        <Text
                            additionalStyles={`font-size: 1rem; color: #7e7e7e`}
                        >Foster creativity and collaboration with a digital canvas. Sketch out ideas, annotate documents, and brainstorm in real-time with your team. Break down barriers and unleash your creativity.</Text>
                    </CardContainer>
                    <CardContainer>
                        <Icon name={'calendar_month'} color={'#000000'} styles={`font-size: 3rem`}/>
                        <Text
                            additionalStyles={`font-size: 1.5rem; font-weight: 600`}
                        >Calendar and Scheduling</Text>
                        <Text
                            additionalStyles={`font-size: 1rem; color: #7e7e7e`}
                        >Stay organized and on track with our calendar feature. Schedule meetings, set reminders, and manage your team's availability effortlessly. Say goodbye to scheduling conflicts and missed appointments.</Text>
                    </CardContainer>
            </CardsGrid>
        </Section>
    </Container>
    )
}

export default Landing
