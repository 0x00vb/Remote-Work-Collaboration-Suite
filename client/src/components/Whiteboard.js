import React, { useState } from 'react';
import styled from 'styled-components';

import SectionsBar from './whiteboard/SectionsBar';
import BoardPage from './whiteboard/BoardPage';

import FilesPage from './whiteboard/FilesPage';


const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
  width: 100%;
`

const ProjectName = styled.h2`
  color: ${({ theme }) => theme.primaryText};

  font-size: 2rem;
`

const Whiteboard = ({ activeProject }) => {
  const [currentWbSection, setCurrentWbSection] = useState('board');

  const renderSection = () =>{
    switch(currentWbSection){
      case 'board':
        return <BoardPage activeProject={activeProject} tasks={activeProject.tasks}/>
      case 'files':
        return <FilesPage/>
      default:
        return <BoardPage activeProject={activeProject} tasks={activeProject.tasks}/>
    }
  }

  return (
    <Container>
      <Header>
        <ProjectName>{activeProject.name}</ProjectName>
        <SectionsBar currentWbSection={currentWbSection} setCurrentWbSection={setCurrentWbSection}/>
      </Header>
        {renderSection()}
    </Container>
  )
}

export default Whiteboard
