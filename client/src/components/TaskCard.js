import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    box-sizing: border-box;
    width: 95%;
    height: 10rem;
    background-color: ${({ theme }) => theme.secondaryBackground};
    padding: 1rem 0.5rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    -webkit-box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.1);
    -moz-box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.1);
    box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.1);
`
const Header = styled.div`
    display: flex;
    gap: 5px;
`

const Tag = styled.div`
    display: flex;
    justify-content: center;
    font-size: 0.75rem;
    width: 3.5rem;
    background-color: ${({ tag, tagsColorPalette }) => tagsColorPalette[tag].backgroundColor};
    color: ${({ tag, tagsColorPalette }) => tagsColorPalette[tag].color};
`

const Title = styled.h2`
    color: ${({ theme }) => theme.primaryText};
    padding: 1rem 0;
`

const Bottom = styled.div`
    border-top: 0.5px solid  ${({ theme }) => theme.primaryText};
    padding-top: 10px;
`

const UserImage = styled.img`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
`

const TaskCard = ({ task }) => {

    const tagsColorPalette = {
        "website": {
            backgroundColor: 'lightgray',
            color: 'gray'
        },
        "design": {
            backgroundColor: 'lightGreen',
            color: 'green'
        }
    }

  return (
    <Container>
      <Header>
        <Tag key={'website'} tag={'website'} tagsColorPalette={tagsColorPalette}>Website</Tag>
        <Tag key={'design'} tag={'design'} tagsColorPalette={tagsColorPalette}>Design</Tag>
      </Header>
      <Title>{task.title}</Title>
      <Bottom>
        <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg' alt={task.assignee} title={task.assignee}/>
      </Bottom>
    </Container>
  )
}

export default TaskCard
