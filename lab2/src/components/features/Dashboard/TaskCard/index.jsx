import React from 'react';
import './TaskCard.css';
import calendarIcon from '../../../../assets/icons/calendar-icon.svg';
import { Draggable } from '@hello-pangea/dnd';
import { useTaskCardAnimations } from '../../../../hooks/useGSAPAnimations';

const TaskCard = ({ task, index }) => {
  const cardRef = useTaskCardAnimations();
  const getTagClass = (tag) => {
    return tag.toLowerCase().replace(' ', '-');
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card ${snapshot.isDragging ? 'is-dragging' : ''}`}
          ref={(el) => {
            provided.innerRef(el);
            if (cardRef) cardRef.current = el;
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={`task-tag ${getTagClass(task.tag)}`}>
            {task.tag}
          </div>
          <p className="task-title">{task.title}</p>
          <div className="task-footer">
            <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
            <span className="task-date">{task.date}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
