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

const MemberCardContainer = styled.div`
  background-color: ${({ theme }) => theme.secondaryBackground};

`

const MemberCardProfPic = styled.img`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  object-fit: cover;
`

const MemberCardUserName = styled.p`
  color: ${({ theme }) => theme.primaryText};

`

const MembersPage = () => {
  const activeProjectMembersData = useSelector((state) => state.activeProject.teamData);
  const [members, setMembers] = useState({});

  useEffect(() => {
    console.log(members);
  }, [])

  return (
    <MainSection>
      {
        members.map((member, index) => (
          <MemberCardContainer key={index}>
            <MemberCardProfPic src={member.profilePic} />
            <MemberCardUserName>{member.name}</MemberCardUserName>
          </MemberCardContainer>
        ))
      }
    </MainSection>
  );
};

export default MembersPage;