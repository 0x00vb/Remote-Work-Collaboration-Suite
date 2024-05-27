import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Icon from './GoogleIcon'

import { updateTaskStatusRedux } from '../redux/activeProjectSlice'

const Container = styled.div`
    position: relative;
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
    justify-content: space-between;
    align-items: center;

`

const Hleft = styled.div`
  display: flex;
  gap: 5px;
`

const Hright = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:50%;
  background-color: rgba(255,255,255,0.1);
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

const OptionsMenu = styled.div`
    background-color: ${({ theme }) => theme.primaryBackground};
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    border-radius: 10px;
`

const OptionContainer = styled.div`
  padding: 0.25rem;
  cursor: pointer;
`

const OptionsText = styled.span`
  color: ${({ theme }) => theme.primaryText};
  font-size: 1rem;
`

const TaskCard = ({ task }) => {
  const activeUser = useSelector(state => state.activeUser);
  const activeProject = useSelector(state => state.activeProject);
  const [optionsMenu, setOptionsMenu] = useState('');
  const menuRef = useRef();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOptionsMenu('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuRef]);

  const hanldeShowOptions = (taskId) => {
    setOptionsMenu(optionsMenu === taskId ? "" : taskId);
  }

  const handleUpdateStatus = (taskId, newStatus) => {
    dispatch(updateTaskStatusRedux({ taskId, newStatus }));
    setOptionsMenu('');
  };

  const renderOptions = () => {
    let options = [];
    switch (task.status) {
      case 'todo':
        options = [
          <OptionContainer key="inProgress" onClick={() => {handleUpdateStatus(task._id, 'in_progress')}}>
            <OptionsText>Mark as in progress</OptionsText>
            </OptionContainer>,
          <OptionContainer key="done" onClick={() => handleUpdateStatus(task._id, 'done')}>
            <OptionsText>Mark as done</OptionsText>
          </OptionContainer>
        ];
        break;
      case 'in_progress':
        options = [
          <OptionContainer key="done" onClick={() => handleUpdateStatus(task._id, 'done')}>
            <OptionsText>Mark as done</OptionsText>
          </OptionContainer>
        ];
        break;
      case 'done':
        options = [
          <OptionContainer key="inProgress" onClick={() => handleUpdateStatus(task._id, 'in_progress')}>
            <OptionsText>Mark as in progress</OptionsText>
          </OptionContainer>
        ];
        break;
      default:
        break;
    }
    return <OptionsMenu ref={menuRef}>{options}</OptionsMenu>;
  }

  return (
    <Container>
      { optionsMenu === task._id && renderOptions() }
      <Header>
        <Hleft>
          <Tag key={'website'} tag={'website'} tagsColorPalette={tagsColorPalette}>Website</Tag>
          <Tag key={'design'} tag={'design'} tagsColorPalette={tagsColorPalette}>Design</Tag>
        </Hleft>
        {
          (task.assignee == activeUser.username || activeUser.username == activeProject.teamLeader) &&(
            <Hright onClick={() => hanldeShowOptions(task._id)}>
              <Icon name="more_horiz"/>
            </Hright>
          )
        }
      </Header>
      <Title>{task.title}</Title>
      <Bottom>
        <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg' alt={task.assignee} title={task.assignee}/>
      </Bottom>
    </Container>
  )
}

export default TaskCard
