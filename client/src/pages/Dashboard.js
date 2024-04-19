import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar'
import Overview from '../components/Overview';

const PageContainer = styled.div`
  display: flex;
  height: 100%;
  background-color: ${({ theme }) => theme.primaryBackground};
  padding-right: 10px;
`

const Dashboard = (props) => {
  return (
    <PageContainer>
        <Sidebar themeToggler={props.themeToggler} theme={props.theme}/>
        <Overview/>
    </PageContainer>
  )
}

export default Dashboard