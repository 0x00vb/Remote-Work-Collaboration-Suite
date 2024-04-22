import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContactCard from './chatPage/ContactCard';
import Icon from './GoogleIcon';

import io, { Socket } from 'socket.io-client'

const Conatiner = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color:  ${({ theme }) => theme.secondaryBackground};
    border-radius: 10px;
    margin: 1rem 0.5rem;
`

const LeftSection = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`

const Input = styled.input`
    color: ${({ theme }) => theme.primaryText};
    background-color:  ${({ theme }) => theme.primaryBackground};
    height: 2rem;
    width: 95%;
    border: none;
    outline: none;
    padding: 1rem 0.5rem;
    border-radius: 10px;
    font-size: 1rem;
`

const Scrollable = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;

    overflow-y: scroll;
    scrollbar-width: none;
`

const RightSection = styled.div`
    width: 74%;
    height: 100%;
    display: flex;
    flex-direction: column;

`

const RightHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    font-size: 2rem;
    color: ${({ theme }) => theme.primaryText};
`

const Text = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.secondaryText};
`

const ChatsContainer = styled.div`
    height: 100%;

    overflow-y: scroll;
`

const ChatInputContainer = styled.div`
    display: flex;
    align-items: center;
    height: 2rem;
    background-color:  ${({ theme }) => theme.primaryBackground};
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
`

const socket = io('http://localhost:5000');

const ChatPage = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true)
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(message){
            socket.emit('sendMessage', { message });
            setMessage('')
        }
    }

  return (
    <Conatiner>
        <LeftSection>
            <Input placeholder='Search'/>
            <Scrollable>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
                <ContactCard/>
            </Scrollable>
        </LeftSection>
        <RightSection>
            <RightHeader>
                <Title>Username</Title>
                <Text>5 members, 2 online</Text>
            </RightHeader>
            <ChatsContainer>
                {
                    
                }
            </ChatsContainer>
            <ChatInputContainer>
                <Icon name="attach_file"/>
                <Input placeholder='Your message'/>
                <div onClick={handleSubmit}>
                    <Icon name="send"/>
                </div>
            </ChatInputContainer>
        </RightSection>
    </Conatiner>
  )
}

export default ChatPage
