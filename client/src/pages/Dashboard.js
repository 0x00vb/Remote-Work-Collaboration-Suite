import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar'

const PageContainer = styled.div`
  height: 98vh;
  background-color: ${({ theme }) => theme.primaryBackground};
  padding: 10px;
`

const Dashboard = () => {
  return (
    <PageContainer>
        <Sidebar/>
    </PageContainer>
  )
}

export default Dashboard