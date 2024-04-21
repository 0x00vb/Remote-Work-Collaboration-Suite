import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'

const localizer = momentLocalizer(moment)

const MyCalendar = ({events}) => (
  <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)