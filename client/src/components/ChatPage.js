import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import ContactCard from './chatPage/ContactCard';
import MessageCard from './chatPage/MessageCard';
import Icon from './GoogleIcon';

import io from 'socket.io-client';

import { fetchChats, setNotifications } from '../redux/chatsSlice';
import { fetchMessages, sendMessage } from '../api/messages';

const Conatiner = styled.div`
    height: 90%;
    width: 100%;    
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color:  ${({ theme }) => theme.secondaryBackground};
    border-radius: 10px;
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

const NewButton = styled.span`
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
    &:hover{
        background-color: rgba(255,255,255, 0.15);
    }
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

const ChatInputContainer = styled.form`
    display: flex;
    align-items: center;
    height: 2rem;
    background-color:  ${({ theme }) => theme.primaryBackground};
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
`

const socket = io('http://localhost:4444');
let selectedChat;

const ChatPage = () => {
    const { chats, activeChat, notifications } = useSelector((state) => state.chats)
    const activeUser = useSelector((state) => state.activeChat);
    const dispatch = useDispatch()
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    const keyDownFunction = async (e) => {
        if ((e.key === "Enter" || e.type === "click") && (message)) {
          setMessage("")
          const data = await sendMessage({ chatId: activeChat._id, message })
          socket.emit("new message", data)
          setMessages([...messages, data])
          dispatch(fetchChats())
        }
    }    

    useEffect(() => {
        const fetchMessagesFunc = async () => {
            if(activeChat){
                setLoading(true);
                const data = await fetchMessages(activeChat._Id);
                setMessages(data);
                socket.emit("Enter chat", activeChat._id);
                setLoading(false);
            }
        }
        fetchMessagesFunc();
        selectedChat = activeChat;
    }, []);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
          if ((!selectedChat || selectedChat._id) !== newMessageRecieved.chatId._id) {
            if (!notifications.includes(newMessageRecieved)) {
              dispatch(setNotifications([newMessageRecieved, ...notifications]))
            }
          }
          else {
            setMessages([...messages, newMessageRecieved])
          }
          dispatch(fetchChats())
        })
      })

    const handleSubmit = async (e) => {
        if ((e.key === "Enter" || e.type === "click") && (message)) {
            setMessage("")
            const data = await sendMessage({ chatId: activeChat._id, message })
            socket.emit("new message", data)
            setMessages([...messages, data])
            dispatch(fetchChats())
        }
    }

  return (
    <Conatiner>
        <LeftSection>
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}>
            <Input placeholder='Search'/>
            <NewButton>
                <Icon name='add' />
            </NewButton>
        </div>
            <Scrollable>
                <ContactCard/>

                {
                    chats?.map((chat, index) => (
                        <ContactCard key={index}/>
                    ))
                }

            </Scrollable>
        </LeftSection>
        <RightSection>
            <RightHeader>
                <Title>Username</Title>
                <Text>5 members, 2 online</Text>
            </RightHeader>
            <ChatsContainer>
                {
                    messages.map((message, index) => (
                        <MessageCard>
                            
                        </MessageCard>
                    ))
                }
            </ChatsContainer>
            <ChatInputContainer onKeyDown={(e) => keyDownFunction(e)} onSubmit={(e) => e.preventDefault()}>
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
