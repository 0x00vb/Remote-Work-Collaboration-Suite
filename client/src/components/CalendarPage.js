import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { useTheme } from 'styled-components';

const localizer = momentLocalizer(moment)

const Container = styled.div`
    height: 90%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    margin: 1rem 0.5rem;
    background-color: #f7f7f7;
`

const CalendarPage = ({ activeProject, activeUser }) => {
  const currentUserTasks = activeProject.tasks.filter(task => task.assignee != activeUser.username);
  const theme = useTheme()
  const [myEvents, setMyEvents] = useState([])

  useEffect(() => {
    if(currentUserTasks){
      const events = currentUserTasks.map(task => ({
        title: task.title,
        start: new Date(task.createdAt),
        end: new Date(task.due_date),
        allDay: true,
      }));
      setMyEvents(events);
    }
  }, [])


  return (
    <Container> 
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: '95%',
            width: '95%',     
          }}
          events={myEvents}
        />
    </Container>
  )
}

export default CalendarPage
