import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';import styled, {css} from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from './GoogleIcon';
import AppIcon from '../assets/favicon-32x32.png';
import { searchUserProjects } from '../api/project';
import { fetchTeamInformation, setActiveProject, fetchProjectTasks } from '../redux/activeProjectSlice';

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
  overflow: hidden;
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
  cursor: pointer;
`

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const LogoutSpanContainer = styled.div`
  background-color: ${({ theme }) => theme.sidebarBackground};
  width: 100%;
  z-index: 900;
  position: absolute;
  transform: ${props => props.show ? 'translateX(-10%) ' : 'translateX(-110%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  transition: all 0.3s ease-in-out;
`

const LogoutSpan = styled.span`
  color: ${({ theme }) => theme.thirdText};  position: absolute;
  font-size: 1.2rem;

`

const Sidebar = ({themeToggler, theme, setCurrentSection, setCreateProject, activeUser }) => {
  const [showLogout, setShowLogout] = useState(false);
  const logoutSpanRef = useRef(null);
  const dispatch = useDispatch();
  const activeProject = useSelector(state => state.activeProject)
  const [isExpanded, setIsExpanded] = useState(true);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [isLeader, setIsLeader] = useState(false);

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
            handleProjectSelection(response.data.projects[0]);
          }

      }catch(err){
        console.log(err);
        toast.error("Something went wrong...");
      }
    }
    fetchCurrentUsersProjects();
  }, [])

  const handleProjectSelection = (project) => {
    try{
      dispatch(setActiveProject(project));
      dispatch(fetchProjectTasks(project.team));
      dispatch(fetchTeamInformation(project._id))
    }catch(err){
      console.log("failed to set activeProject: ", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/teamSync');
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutSpanRef.current && !logoutSpanRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(activeProject.teamData.leader == activeUser.name){
      setIsLeader(true);
    }
  }, [])

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
          {
              isLeader && (
                <SidebarSectionItem>
                  <GoogleIcon name={'folder_managed'}/>
                  <SidebarSectionText>
                    Manage project
                  </SidebarSectionText>
                </SidebarSectionItem>
              )
          }
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
              <SidebarSectionItem key={project._id} onClick={() => handleProjectSelection(project)}>
                <SidebarSectionSpan selected={activeProject.id === parseInt(project._id)}>#</SidebarSectionSpan>
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
      <SidebarBottom onClick={() => setShowLogout(true)} ref={logoutSpanRef}>
        <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'/>
        <SidebarSectionText>
          {activeUser.name}
        </SidebarSectionText>
        <LogoutSpanContainer show={showLogout} onClick={handleLogout}>
          <LogoutSpan>Logout</LogoutSpan>
        </LogoutSpanContainer>
      </SidebarBottom>

    </SidebarContainer>
  )
}

export default Sidebar

