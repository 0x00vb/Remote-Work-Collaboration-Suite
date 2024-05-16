import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { fetchTeamMembers } from '../api/team'

const Conatiner = styled.div`
    height: 90%;
    width: 100%;    
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color:  ${({ theme }) => theme.secondaryBackground};
    border-radius: 10px;
`
const Section = styled.div`
    display: flex;
    flex-direction: column; 
`

const SubSection = styled.div`
    display: flex;
    flex-direction: row:
    gap: 2rem;
`

const Text = styled.h2`
  color: ${({ theme }) => theme.primaryText};
  font-size: 2rem;
`

const MemberCardContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;    
  background-color: ${({ theme }) => theme.primaryBackground};
  padding: 0.5rem 1rem;
`

const MemberCardProfPic = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`

const MemberCardUserName = styled.p`
  color: ${({ theme }) => theme.primaryText};

`

const ProjectManagement = ({activeProject}) => {


    return (
        <Conatiner>
            <Section>
                <Text>Team members</Text>
                <SubSection>
                {
                    activeProject.teamData.members.map((member, index) => (
                    <MemberCardContainer key={index}>
                        <MemberCardProfPic src={member.profilePic} />
                        <MemberCardUserName>{member.username}</MemberCardUserName>
                    </MemberCardContainer>
                    ))
                }
                </SubSection>
            </Section>
        </Conatiner>
    )
}

export default ProjectManagement;