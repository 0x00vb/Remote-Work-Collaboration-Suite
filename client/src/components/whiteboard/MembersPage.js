import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Icon from '../GoogleIcon';
import { searchUsers } from '../../api/auth';

const MainSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  width: 100%;
  height: 90%;
  display: flex;
  gap: 1.5rem;
`;

const MembersPage = () => {
  const activeProjectMembersData = useSelector((state) => state.activeProject.teamData);
  const [members, setMembers] = useState({});

  return (
    <MainSection>

    </MainSection>
  );
};

export default MembersPage;