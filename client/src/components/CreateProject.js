import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

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
    background-color: ${({ theme }) => theme.primaryBackground};
    height: 50%;
    width: 50%;
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
    padding: 5px;
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Button = styled.button`
    border: none;
`

const CreateProject = ({ setCreateProject }) => {
    const contentRef = useRef(null);

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
  return (
    <Container>
        <MainContent ref={contentRef}>
            <Header>
                <Title>
                    New project
                </Title>
            </Header>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
                <Left>
                    <Text style={{fontWeight: '600', fontSize: '1.1rem'}}>
                        Project description
                    </Text>
                </Left>
                <Right>
                    <InputContainer>
                        <Text>Project name</Text>
                        <Input/>
                    </InputContainer>
                    <InputContainer>
                        <Text>Project description</Text>
                        <Input/>
                    </InputContainer>
                </Right>
            </div>
            <div>
                <Left>
                    <Text style={{fontWeight: '600', fontSize: '1.1rem'}}>
                        Team
                    </Text>
                </Left>
                <Right>
                    
                </Right>
            </div>
        </MainContent>
    </Container>
  )
}

export default CreateProject
