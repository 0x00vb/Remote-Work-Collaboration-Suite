import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';

import styled from 'styled-components';
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard';
import Whiteboard from '../components/Whiteboard';
import ChatPage from '../components/ChatPage';
import CalendarPage from '../components/CalendarPage';
import { validUser } from '../api/auth';
import { setActiveUser } from '../redux/activeUserSlice';
import { toast,ToastContainer } from 'react-toastify';
import CreateProject from '../components/CreateProject';

const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryBackground};
  gap: 1rem;
`

const Main = (props) => {
  const dispatch = useDispatch()
  const { activeUser } = useSelector((state) => state)
  const [currentSection, setCurrentSection] = useState('Dashboard');
  const navigate = useNavigate();
  
  useEffect(() => {
    const userValidation = async () => {
      try{
          const data = await validUser();
          console.log(data)
          if(data){
            const user = {
              id: data?.user?._id,
              email: data?.user?.email,
              profilePic: data?.user?.profilePic,
              bio: data?.user?.bio,
              username: data?.user?.username
            }
            dispatch(setActiveUser(user));
            toast(`Hello ${activeUser.username}`);
            console.log(activeUser)
          }else{
            navigate('/teamSync');
          }
        }catch(error){
          navigate('/teamSync');
        }
    }
    userValidation();
  }, [dispatch, navigate])


  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'whiteboard':
        return <Whiteboard/>
      case 'chat':
        return <ChatPage/>;
      case 'calendar':
        return <CalendarPage/>;
      case 'newProject':
        return <CreateProject/>
      default:
        return <Dashboard />;
    }
  };

  return (
    <PageContainer>
        <Sidebar themeToggler={props.themeToggler} theme={props.theme} setCurrentSection={setCurrentSection}/>
        {renderSection()}  
        <ToastContainer/>
      </PageContainer>
  )
}

export default Main