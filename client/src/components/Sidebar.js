import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';import styled, {css} from 'styled-components';
import { toast } from 'react-toastify';

import GoogleIcon from './GoogleIcon';
import AppIcon from '../assets/favicon-32x32.png';
import { searchUserProjects } from '../api/project';
import { setActiveProject } from '../redux/activeProjectSlice';

const SidebarContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 80%;
  max-width: ${props => (props.expanded ? '13rem' : '2rem')};
  min-height: 44rem;
  height: 95%;
  background-color: ${({ theme }) => theme.sidebarBackground};
  padding: 0 1.5rem;
  margin: 0 0.5rem;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;
  ${props => 
    !props.expanded && 
    css`
      ${SidebarSectionText} {display: none},
      ${SidebarSectionTitle} {display: none},
      ${Logo} {display: none},
      ${SidebarSectionItem} {justify-content: center},
      ${SidebarSwitch} {transform: rotate(180deg)},
      ${SidebarSectionSpan} {display: none}
    `
  }
`

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid #d9d9d9;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  gap: 2rem;
`
const Logo = styled.h2`
  color: #FFF;
  font-size: 24;
`;

const SidebarSwitch = styled.span`
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -10px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
`

const SidebarSectionsContainer = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
`

const SidebarSectionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 7px 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color: rgba(255,255,255, 0.3);
  }
`

const SidebarSectionText = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.thirdText};
`

const SidebarSectionSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, selected }) => selected ? theme.thirdText : theme.accent};
  font-size: 22px;
  font-weight: 800;
`

const SidebarSectionTitle = styled.p`
  font-size: 19px;
  color: ${({ theme }) => theme.thirdText};
  border-top: 0.5px solid #D9D9D9;
  padding-top: 15px;
  padding-bottom: 5px;
`

const SidebarNewProjectBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.thirdText};
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`

const SidebarBottom = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-self: center;
  gap: 10px;
  padding: 20px 0;
`

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const Sidebar = ({themeToggler, theme, setCurrentSection, setCreateProject, currentUserName }) => {
  const dispatch = useDispatch();
  const activeProject = useSelector(state => state.activeProject)
  const [isExpanded, setIsExpanded] = useState(true);
  const [projects, setProjects] = useState([]);

  const handleChangeTheme = () => {
    themeToggler()
  }

  const handleChangeSection = (section) =>{
    setCurrentSection(section);
  }

  useEffect(() => {
    const fetchCurrentUsersProjects = async () =>{
      try{
        const response = await searchUserProjects();
        if(response.status === 200){
            setProjects(response.data.projects);
            dispatch(setActiveProject(response.data.projects[0]))
          }

      }catch(err){
        console.log(err);
        toast.error("Something went wrong...");
      }
    }
    fetchCurrentUsersProjects();
  }, [])

  const handleProjectSelection = (project) => {
    dispatch(setActiveProject(project));
  }

  return (
    <SidebarContainer expanded={isExpanded}>
      <SidebarHeader>
        <div style={{display: 'flex', gap: '5px'}}>
          <UserImage src={AppIcon}/>
          <Logo>TeamSync</Logo>
        </div>
        <SidebarSectionSpan onClick={handleChangeTheme}>
          <GoogleIcon name={theme === 'light' ? 'dark_mode' : 'light_mode'}/>
        </SidebarSectionSpan>
        <SidebarSwitch onClick={() => setIsExpanded(!isExpanded)}>
          <GoogleIcon name={'chevron_left'}/>
        </SidebarSwitch>
      </SidebarHeader>
      <SidebarSectionsContainer>
        <SidebarSection>
          <SidebarSectionItem>
            <GoogleIcon name={'insert_chart'}/>
            <SidebarSectionText>
              Activity
            </SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem>
            <GoogleIcon name={'check_circle'}/>
            <SidebarSectionText>
              Tasks
            </SidebarSectionText>
          </SidebarSectionItem>
        </SidebarSection>
        <SidebarSection>
          <SidebarSectionTitle>
            Menu
          </SidebarSectionTitle>
          <SidebarSectionItem onClick={() => handleChangeSection('dashboard')}>
            <GoogleIcon name={'dashboard'}/>
            <SidebarSectionText>Dashboard</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem onClick={() => handleChangeSection('whiteboard')}>
            <GoogleIcon name={'visibility'}/>
            <SidebarSectionText>Whiteboard</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem onClick={() => handleChangeSection('chat')}>
            <GoogleIcon name={'chat_bubble'}/>
            <SidebarSectionText>Chat</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem onClick={() => handleChangeSection('calendar')}>
            <GoogleIcon name={'calendar_today'}/>
            <SidebarSectionText>Calendar</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem onClick={() => handleChangeSection('meetings')}>
            <GoogleIcon name={'groups'}/>
            <SidebarSectionText>Meetings</SidebarSectionText>
          </SidebarSectionItem>
        </SidebarSection>
        <SidebarSection>
        <SidebarSectionTitle>Projects</SidebarSectionTitle>
          {
            projects.map((project, index) => (
              console.log(activeProject.id, project._id),
              <SidebarSectionItem key={project._id} onClick={() => handleProjectSelection(project)}>
                <SidebarSectionSpan selected={activeProject.id == parseInt(project._id)}>#</SidebarSectionSpan>
                <SidebarSectionText>{project.name}</SidebarSectionText>
              </SidebarSectionItem>
            ))
          }
          <SidebarNewProjectBtn onClick={() => setCreateProject(true)}>
            {
              isExpanded ?
                'Create new project'
                :
                <GoogleIcon name={'add'} color={'#000'}/>
            }
          </SidebarNewProjectBtn>
        </SidebarSection>
      </SidebarSectionsContainer>
      <SidebarBottom>
        <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'/>
        <SidebarSectionText>
          {currentUserName}
        </SidebarSectionText>
      </SidebarBottom>
    </SidebarContainer>
  )
}

export default Sidebar

