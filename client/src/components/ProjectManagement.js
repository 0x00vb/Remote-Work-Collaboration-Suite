import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Icon from './GoogleIcon'
import { toast } from 'react-toastify'
import { createTask } from '../api/task'

const Conatiner = styled.div`
position: relative;
    height: 90%;
    width: 100%;    
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color:  ${({ theme }) => theme.secondaryBackground};
    border-radius: 10px;
    flex-direction: column;
`
const Section = styled.div`
    display: flex;
    flex-direction: column; 
    gap: 0.5rem;
`

const SubSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    padding: 0.5rem 1rem;
`

const Text = styled.h2`
  color: ${({ theme }) => theme.primaryText};
  font-size: 2rem;
`

const MemberCardContainer = styled.div`
  width: 12rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primaryBackground};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  box-shadow: 2px 1px 3px 0px rgba(0,0,0,0.2);
`

const MemberCardSections = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

const SmallText = styled.p`
    font-size: 1.25rem;
    font-weight: 400;
    color: ${({ theme }) => theme.primaryText};
`

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`

const Input = styled.input`
    font-size: 1rem;
    height: 2rem;
    width: auto;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.gray};
    outline: none;
`
const Textarea = styled.textarea`
    font-size: 1rem;
    height: 4rem;
    max-height: 6rem;
    width: auto;
    max-width: 98%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.gray};
    outline: none;
`

const UserSearchContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UsersSelectorContainer = styled.div`
    width: 100%;
    height: auto;
    background-color: #FFFFFF;
    display: ${props => props.show ? 'inline' : 'none'};
    padding: 0.1rem;
    border-radius: 5px;
`

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

const UserUsername = styled.p`
    color: ${({ theme }) => theme.primaryText};
`

const UserImg = styled.img`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
`


const Clickable = styled.div`
    ${props => props.isSelected && {backgroundColor: '#3e97c7d5'}}
    width: 1rem;
    height: 1rem;
    border: solid 2px #3e98c7;
    border-radius: 3px;
    cursor: pointer;
`

const Button = styled.span`
    background-color: ${({ theme }) => theme.accent};
    color: #F2F2F0;
    font-weight: bold;
    font-size: 1.2rem;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    justify-self: flex-end;
    align-self: flex-end;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
`

const ProjectManagement = ({activeProject}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [filteredMembers, setFilteredMembers] = useState(activeProject.teamMembers);
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (searchInput === "") {
            setFilteredMembers(activeProject.teamMembers);
        } else {
            const results = activeProject.teamMembers.filter(member =>
                member.username.toLowerCase().includes(searchInput.toLowerCase())
            );
            setFilteredMembers(results);
        }
    }, [searchInput])

    const handleCreateTask = async (title, description, assignee, dueDate) => {
        try{
            const projectId = activeProject.id;
            const response = await createTask(
                title,
                description,
                assignee,
                dueDate,
                projectId
            );
            console.log(response);
            toast.success(response.message);
        }catch(err){
            toast.error(err);
        }
    }

    return (
        <Conatiner>
            <Section>
                <Text>Team members</Text>
                <SubSection>
                {
                    activeProject.teamMembers.map((member, index) => (
                    <MemberCardContainer key={index}>
                        <MemberCardSections>
                            <MemberCardProfPic src={member.profilePic} />
                            <MemberCardUserName>{member.username}</MemberCardUserName>
                        </MemberCardSections>
                        <MemberCardSections style={{justifyContent: 'right'}}>
                            <Icon name='logout' styles={`font-size: 1.2rem`}/>
                            <Icon name='mail' styles={`font-size: 1.2rem`}/>
                        </MemberCardSections>
                    </MemberCardContainer>
                    ))
                }
                </SubSection>
            </Section>
            <Section>
                <Text>New task</Text>
                <SubSection style={{flexDirection: 'column'}}>
                    <InputContainer>
                        <SmallText>Name</SmallText>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <SmallText>Description</SmallText>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </InputContainer>
                    <div style={{display: 'flex'}}>
                        <InputContainer>
                            <SmallText>Assignee</SmallText>
                            <UserSearchContainer>
                                <Input
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    style={{width: '98%'}}
                                />
                                <UsersSelectorContainer show={searchInput !== ""}>
                                    {
                                        filteredMembers.map((member, index) => (
                                            <UserContainer key={index}>
                                                <Clickable onClick={() => setAssignee( assignee === member.username ? "" : member.username)} isSelected={member.username === assignee}/>
                                                <UserImg src={member.profilePic}/>
                                                <UserUsername>{member.username}</UserUsername>
                                            </UserContainer>
                                        ))
                                    }
                                </UsersSelectorContainer>
                            </UserSearchContainer>
                        </InputContainer>
                        <InputContainer>
                            <SmallText>Due date</SmallText>
                            <Input
                                type='date'
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </InputContainer>
                    </div>
                </SubSection>
            </Section>
            <div style={{display: 'flex', justifyContent: 'right', position: 'absolute', bottom: '1.5rem', right: '1.5rem'}}>
                <Button onClick={() => handleCreateTask(title, description, assignee, dueDate)}>
                    Create task
                </Button>
            </div>
        </Conatiner>
    )
}

export default ProjectManagement;