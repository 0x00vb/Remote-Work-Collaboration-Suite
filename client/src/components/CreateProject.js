import React, { useRef, useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import { searchUsers } from '../api/auth';
import { createProject } from '../api/project'
import { createTeam } from '../api/team'
import Icon from './GoogleIcon';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
position: absolute;
top: 0;
left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:  rgba(110, 110, 110, 0.5);
    height: 100%;
    width: 100%;
    border-radius: 10px;
`

const MainContent = styled.div`
    display: flex;
    flex-direction: column;

    background-color: ${({ theme }) => theme.secondaryBackground};
    height: 75%;
    width: 60%;
    max-width: 650px;
    padding: 1rem;
    border-radius: 15px;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20%;
`

const Right = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
`

const Header = styled.div`
    margin-bottom: 1.5rem;
`

const Title = styled.h4`
    font-size: 2rem;
    color: ${({ theme }) => theme.primaryText};
`

const Text = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.primaryText};
`

const Form = styled.div`

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

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const UserSearchContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UsersSelectorContainer = styled.div`
    width: 60%;
    height: auto;
    background-color: #FFFFFF;
    ${props => props.show  && {padding: '1rem 0.5rem'}};
    border-radius: 0 0 5px 5px;
    margin-top: -5px;
`

const Clickable = styled.div`
    ${props => props.isSelected && {backgroundColor: '#3e97c7d5'}}
    width: 1rem;
    height: 1rem;
    border: solid 2px #3e98c7;
    border-radius: 3px;
    cursor: pointer;
`

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

const UserInfo = styled.div`
    display: flex;
    height: auto;
    max-height: 1rem;
    align-items: center;
    gap: 10px;
    padding: 5px 10px;
    transition: all 0.3s ease-in-out;
`

const UserImg = styled.img`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
`

const UserUsername = styled.p`

`

const SelectedUsersContainer = styled.div`
    ${props => props.show  && {width: '30%'}};
    height: auto;
    background-color: #FFFFFF;
    ${props => props.show  && {padding: '0.5rem'}};
    overflow-y: scroll;
`

const BottomSection = styled.div`
    margin-left: auto;
    margin-top: auto;

`

const Button = styled.button`
    background-color: #3e98c7;
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem;
    border-radius: 20px;
    border: none;
    cursor: pointer;
`

const CreateProject = ({ setCreateProject }) => {
    const activeUser = useSelector(state => state.activeUser);
    const [pName, setPName] = useState([]);
    const [pDesc, setPDesc] = useState([]);
    const contentRef = useRef(null);
    const [searchUsersResults, setSearchUsersResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [teamMembers, setTeamMembers] = useState([activeUser]);
    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (contentRef.current && !contentRef.current.contains(event.target)) {
          setCreateProject(false);
        }
      };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [setCreateProject]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if(searchInput !== ""){
                try{
                    const results = await searchUsers(searchInput);
                    setSearchUsersResults(results.data);
                }catch(err){
                    console.log(err)
                }
            }else{
                setSearchUsersResults([])
            }
        }
        fetchSearchResults();
    }, [searchInput])

    const addToSelectedUsers = (user) => {
        if (teamMembers.some(selectedUser => selectedUser.username === user.username)) {
            setTeamMembers(teamMembers.filter(selectedUser => selectedUser.username !== user.username));
        } else {
            setTeamMembers([...teamMembers, user]);
        }
    }

    const removeFromSelectedUsers = (username) => {
        setTeamMembers(teamMembers.filter(user => user.username !== username));
    }

    const handleCreateProject = async () => {
        try{
            const teamMembersUsernames = teamMembers.map(user => user.username);
            console.log(teamMembersUsernames)
            const teamResponse = await createTeam(teamMembersUsernames, activeUser.username);
            if(teamResponse.status === 200){
                const teamId = teamResponse.data.teamId;
                const projectResponse = await createProject(pName, pDesc, teamId);
                if(projectResponse.status === 200){
                    toast.success(projectResponse.data.message);
                    setTimeout(() =>{
                        navigate('/');
                    }, 1000);
                }
            }else{
                toast.error(teamResponse.data.message)
            }
        }catch(err){
            console.log(err);
            toast.error("Something went wrong! Try again later.")
        }
    }

    return (
        <Container>
            <MainContent ref={contentRef}>
                <Header>
                    <Title>
                        New project
                    </Title>
                </Header>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%', marginBottom: '1rem'}}>
                    <Left>
                        <Text style={{fontWeight: '600', fontSize: '1.1rem'}}>
                            Project description
                        </Text>
                    </Left>
                    <Right>
                        <InputContainer>
                            <Text>Project name</Text>
                            <Input
                                value={pName}
                                onChange={(e) => setPName(e.target.value)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Text>Project description</Text>
                            <Textarea
                                value={pDesc}
                                onChange={(e) => setPDesc(e.target.value)}
                            />
                        </InputContainer>
                    </Right>
                </div>
                <div style={{height: '100%'}}>
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', height: '100%', width: '100%'}}>
                        <Left>
                            <Text style={{fontWeight: '600', fontSize: '1.1rem'}}>
                                Team Members
                            </Text>
                        </Left>
                        <Right style={{flexDirection: 'row'}}>
                            <UserSearchContainer>
                                <Input
                                    placeholder='Search for new members: '
                                    value={searchInput}
                                    onChange={(e) => {setSearchInput(e.target.value)}}
                                    style={{width: '60%', padding: '5px 0.5rem'}}
                                />
                                <UsersSelectorContainer show={searchUsersResults.length > 0}>
                                    {
                                        searchUsersResults.map((user) => (
                                            <UserContainer key={user._id}>
                                                <Clickable onClick={() => addToSelectedUsers(user)} isSelected={teamMembers.some(selectedUser => selectedUser.username === user.username)}/>
                                                <UserInfo>
                                                    <UserImg src={user.profilePic}/>
                                                    <UserUsername>{user.username}</UserUsername>
                                                </UserInfo>
                                            </UserContainer>
                                        ))
                                    }
                                </UsersSelectorContainer>
                            </UserSearchContainer>
                            <SelectedUsersContainer show={teamMembers.length > 0}>
                                    {
                                        teamMembers.map((user, index) => (
                                            <UserContainer key={index} style={{border: '1px solid black', width: 'auto', borderRadius: '10px'}}>
                                                <UserImg src={user.profilePic}/>
                                                <UserUsername>{user.username}</UserUsername>
                                                <div 
                                                    onClick={() => removeFromSelectedUsers(user.username)}
                                                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                    <Icon name={'close'} style={{fontSize: '1.25rem'}}/>  
                                                </div>
                                            </UserContainer>
                                        ))
                                    }
                            </SelectedUsersContainer>
                        </Right>
                    </div>
                </div>
                <BottomSection>
                    <Button onClick={handleCreateProject}>Create project</Button>
                </BottomSection>
            </MainContent>
        </Container>
    )
}

export default CreateProject
