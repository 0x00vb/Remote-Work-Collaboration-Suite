import React from 'react'
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 17%;
  height: 100%;
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: 0 20px;
  border-radius: 15px;
`

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid #d9d9d9;
  padding: 10;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`
const Logo = styled.h2`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 24;
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  gap: 15px;
`

const SidebarSectionItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  :hover{
    background-color: red;
  }
`

const SidebarSectionText = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.sidebarText};
`

const SidebarSectionTitle = styled.p`
  font-size: 19px;
  color: ${({ theme }) => theme.sidebarText};
  border-top: 0.5px solid #D9D9D9;
  padding-top: 15px;
`

const MaterialIcon = (props) => (
  <span className={`${props.className} material-symbols-outlined`} style={props.style}>{props.name}</span>
)

const Icon = styled(MaterialIcon)`
  color: ${({ theme }) => theme.sidebarText};
  &.material-symbols-outlined {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  };
  cursor: pointer;
`

const SidebarNewProjectBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.sidebarText};
  font-weight: 600;
  padding: 12px 0;
  border-radius: 10px;
  margin-top: 50px;

`

const SidebarBottom = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  gap: 5px;
`

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`


const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <Logo>TeamCollabs</Logo>
        <Icon name={'dark_mode'}/>
      </SidebarHeader>
      <SidebarSection>
        <SidebarSectionItem>
          <Icon name={'insert_chart'}/>
          <SidebarSectionText>
            Activity
          </SidebarSectionText>
        </SidebarSectionItem>
        <SidebarSectionItem>
          <Icon name={'check_circle'}/>
          <SidebarSectionText>
            Tasks
          </SidebarSectionText>
        </SidebarSectionItem>
      </SidebarSection>
      <SidebarSectionText>
        Menu
      </SidebarSectionText>
      <SidebarSection>
        <SidebarSectionItem>
          <Icon name={'dashboard'}/>
          <SidebarSectionText>Dashboard</SidebarSectionText>
        </SidebarSectionItem>
        <SidebarSectionItem>
          <Icon name={'chat_bubble'}/>
          <SidebarSectionText>Chat</SidebarSectionText>
        </SidebarSectionItem>
        <SidebarSectionItem>
          <Icon name={'calendar_today'}/>
          <SidebarSectionText>Calendar</SidebarSectionText>
        </SidebarSectionItem>
        <SidebarSectionItem>
          <Icon name={'groups'}/>
          <SidebarSectionText>Team members</SidebarSectionText>
        </SidebarSectionItem>
        <SidebarSectionItem>
          <Icon name={'settings'}/>
          <SidebarSectionText>Settings</SidebarSectionText>
        </SidebarSectionItem>
      </SidebarSection>
      <SidebarSectionTitle>Projects</SidebarSectionTitle>
      <SidebarSection>

        {/* Map trough user's Projects */}
        <SidebarSectionItem>
          <SidebarSectionText>#</SidebarSectionText>
          <SidebarSectionText>Project1</SidebarSectionText>
        </SidebarSectionItem>
        <SidebarSectionItem>
          <SidebarSectionText>#</SidebarSectionText>
          <SidebarSectionText>Project1</SidebarSectionText>
        </SidebarSectionItem>
        <SidebarSectionItem>
          <SidebarSectionText>#</SidebarSectionText>
          <SidebarSectionText>Project1</SidebarSectionText>
        </SidebarSectionItem>
        <SidebarNewProjectBtn>Create new project</SidebarNewProjectBtn>
      </SidebarSection>
      <SidebarBottom>
        <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'/>
        <SidebarSectionText>
          Workspace name
        </SidebarSectionText>
      </SidebarBottom>
    </SidebarContainer>
  )
}

export default Sidebar

