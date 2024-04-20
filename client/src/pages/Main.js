import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard';

const PageContainer = styled.div`
  display: flex;
  height: 100%;
  background-color: ${({ theme }) => theme.primaryBackground};
  padding-right: 10px;
`

const Main = (props) => {
  const [currentSection, setCurrentSection] = useState('Dashboard');
  


  return (
    <PageContainer>
        <Sidebar themeToggler={props.themeToggler} theme={props.theme}/>
        <Dashboard/>
    </PageContainer>
  )
}

export default Main