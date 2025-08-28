import React, { useState } from 'react';
import './Dashboard.css';
import TaskCard from './TaskCard';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import ButtonWithDoraemon from '../../common/Button/ButtonWithDoraemon';
import dashboardIcon from '../../../assets/icons/dashboard-icon.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus-icon.svg';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import noDataIllustration from '../../../assets/icons/no-data-illustration.svg';
import Notification from '../../common/Notification';
import { useGSAPAnimations } from '../../../hooks/useGSAPAnimations';

const initialTasks = [
  {
    id: '1',
    title: 'Build design for Dashboard in Figma',
    tag: 'Design',
    date: 'December 12, 2023',
    status: 'To Start'
  },
  {
    id: '2',
    title: 'Build components for Card, Notification and Button',
    tag: 'Front-end',
    date: 'December 12, 2023',
    status: 'To Start'
  },
  {
    id: '3',
    title: 'Build another component',
    tag: 'Front-end',
    date: 'December 13, 2023',
    status: 'Done'
  },
  {
    id: '4',
    title: 'Build design for login page in Figma',
    tag: 'Design',
    date: 'December 14, 2023',
    status: 'In Progress'
  }
];

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    type: 'Front-end',
  });

  // GSAP Animation hook
  const containerRef = useGSAPAnimations();

  const handleSaveChanges = () => {
    if (newTask.name.trim()) {
      const task = {
        id: Date.now().toString(),
        title: newTask.name,
        tag: newTask.type,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        status: 'To Start'
      };
      setTasks([task, ...tasks]);
      setShowModal(false);
      setNewTask({ name: '', type: 'Front-end' });
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );
  };

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  const KanbanColumn = ({ title, tasks }) => (
    <div className="kanban-column">
      <div className="column-header">{title}</div>
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            className={`column-content ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))
            ) : (
              !snapshot.isDraggingOver && (
                <div className="empty-state">
                  <img
                    src={noDataIllustration}
                    alt="No data"
                    className="empty-state-illustration"
                  />
                  <div className="empty-state-text">No data, yet</div>
                </div>
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  return (
    <div className="dashboard" ref={containerRef}>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <img src={dashboardIcon} alt="Dashboard" className="dashboard-icon" />
          <h1>Dashboard</h1>
        </div>
        <ButtonWithDoraemon
          IconComponent={PlusIcon}
          onClick={() => setShowModal(true)}
          showDoraemon={true}
          doraemonMessage="Hãy bấm vào tôi để tạo task!"
        >
          Crear tarea
        </ButtonWithDoraemon>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
        <KanbanColumn title="To Start" tasks={getTasksByStatus('To Start')} />
        <KanbanColumn title="In Progress" tasks={getTasksByStatus('In Progress')} />
        <KanbanColumn title="Done" tasks={getTasksByStatus('Done')} />
        </div>
      </DragDropContext>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create task"
        onSubmit={handleSaveChanges}
        submitText="Save changes"
      >
        <p className="modal-subtitle">Make changes to your tasks here. Click save when you're done.</p>
        <div className="form-group-new">
          <label className="form-label-new">Name</label>
          <input
            type="text"
            className="form-input-new"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            placeholder="Task name"
          />
        </div>
        <div className="form-group-new">
          <label className="form-label-new">Type</label>
          <div className="type-options">
            {['Design', 'Front-end', 'Back-end', 'Devops'].map((type) => (
              <div key={type} className="type-option" onClick={() => setNewTask({ ...newTask, type })}>
                <div className={`type-radio ${newTask.type === type ? 'selected' : ''}`} />
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {showNotification && <Notification onClose={() => setShowNotification(false)} />}
    </div>
  );
};

export default Dashboard;
