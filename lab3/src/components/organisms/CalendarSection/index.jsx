
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarSection.css';
import avatarImage1 from '../../../assets/images/avatar-image-1.png';


const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomEvent = ({ event, handleOpenEditModal }) => {
  const handleEdit = () => {
    handleOpenEditModal(event.resource);
  };

  return (
    <div className="custom-event" onClick={handleEdit}>
      {event.resource.tag && <div className="event-tag" style={{backgroundColor: event.resource.color, color: 'white'}}>{event.resource.tag}</div>}
      <div className="event-title">{event.title}</div>
      <img src={event.resource.avatar} alt="avatar" className="event-avatar" />
    </div>
  );
};

const CalendarSection = ({ tasks = [], handleOpenEditModal, handleDeleteTask, handleToggleComplete }) => {
  const events = tasks.map(task => {
    const [day, month, year] = task.date.split('/').map(Number);
    const taskDate = new Date(year, month - 1, day);

    return {
      title: task.title,
      start: taskDate,
      end: taskDate,
      allDay: true,
      resource: {
        ...task,
        avatar: avatarImage1, // Using a default avatar for now
        color: task.priorityColor,
      },
    };
  });

  return (
    <div className="calendar-section">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '800px' }}
        views={['month']}
        defaultView="month"
        toolbar={false}
        components={{
                    event: (props) => <CustomEvent {...props} handleOpenEditModal={handleOpenEditModal} handleDeleteTask={handleDeleteTask} handleToggleComplete={handleToggleComplete} />,
        }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: `${event.resource.color}20`,
            borderLeft: `3px solid ${event.resource.color}`,
            borderRadius: '4px',
            padding: '8px',
          },
        })}
      />
    </div>
  );
};

export default CalendarSection;
