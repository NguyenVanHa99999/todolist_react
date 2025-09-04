import React from 'react';
import KanbanBoard from '../../organisms/KanbanBoard';
import './DashboardDetailPage.css';

const initialColumns = [
  { id: 'todo', title: 'To Start' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

const DashboardDetailPage = ({ currentDashboard, setTasks }) => {

  const handleAddTask = (columnId, title) => {
    const newTask = {
      id: `${currentDashboard.id}-${Date.now()}`,
      title,
      columnId,
    };
    setTasks(currentTasks => [...currentTasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
  };

  const handleUpdateTask = (taskId, newTitle) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className="dashboard-detail-page">
      <div className="page-header-detail">
        <h1 className="page-title-detail">{currentDashboard.emoji} {currentDashboard.name}</h1>
      </div>
      <KanbanBoard
        columns={initialColumns}
        tasks={currentDashboard.tasks}
        setTasks={setTasks}
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default DashboardDetailPage;

