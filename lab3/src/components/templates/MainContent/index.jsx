import { useState, useEffect } from 'react';
import TaskCard from '../../molecules/TaskCard';
import ProgressCard from '../../molecules/ProgressCard';
import GroupTaskCard from '../../organisms/GroupTaskCard';
import CalendarSection from '../../organisms/CalendarSection';
import ListView from '../../organisms/ListView';
import TableView from '../../organisms/TableView';
import avatarImage1 from '../../../assets/images/avatar-image-1.png';
import AddTaskModal from '../../organisms/AddTaskModal';
import EditTaskModal from '../../organisms/EditTaskModal';
import EditGroupTaskModal from '../../organisms/EditGroupTaskModal';
import avatarImage2 from '../../../assets/images/avatar-image-2.png';
import './MainContent.css';

// MUI Imports
import Box from '@mui/material/Box';
import Button from '../../atoms/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import TableViewIcon from '@mui/icons-material/TableView';
import AddIcon from '@mui/icons-material/Add';

import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const MainContent = () => {
  const [view, setView] = useState('calendar');
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
    const [filter, setFilter] = useState('all');
  const [isGroupTaskEditModalOpen, setIsGroupTaskEditModalOpen] = useState(false);
  const [currentGroupTask, setCurrentGroupTask] = useState(null);

    const initialTasks = [
    {
      id: 1, date: '28/02/2022', title: 'Send report',
      priority: 'highest', priorityColor: '#DA4343', completed: true, groupId: 1
    },
    {
      id: 2, date: '28/02/2022', title: 'Create a Data studio Dashboard to tracking mobile app events',
      priority: 'low', priorityColor: '#30CD60', completed: false, groupId: 1
    },
    {
      id: 3, date: '28/02/2022', title: 'Update Design System - Forms',
      priority: 'high', priorityColor: '#DA4343', completed: false, groupId: 2
    },
    {
      id: 4, date: '28/02/2022', title: 'Send monthly report to Product Director',
      priority: 'low', priorityColor: '#30CD60', completed: true, groupId: 2
    },
    {
      id: 5, date: '28/02/2022', title: 'Sprint 26 planning - Create local database for mobile app user and sup...',
      priority: 'medium', priorityColor: '#FFA940', completed: false, groupId: 1
    }
  ];

  const [tasks, setTasks] = useState(initialTasks);

  // New handler to toggle task completion status
  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.priority === filter;
  });

  const handleViewChange = (_event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'highest':
      case 'high':
        return '#DA4343';
      case 'medium':
        return '#FFA940';
            case 'low':
      case 'lowest':
        return '#30CD60';
      default:
        return '#6B7280';
    }
  };

    const handleAddTask = (newTask) => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const formattedDate = newTask.date.toLocaleDateString('en-GB');
    setTasks([...tasks, {
      id: newId,
      date: formattedDate,
      title: newTask.title,
      priority: newTask.priority,
      priorityColor: getPriorityColor(newTask.priority),
    }]);
  };

  const handleOpenEditModal = (task) => {
    setCurrentTask(task);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setCurrentTask(null);
    setEditModalOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    const formattedDate = updatedTask.date instanceof Date ? updatedTask.date.toLocaleDateString('en-GB') : updatedTask.date;
    setTasks(tasks.map(task =>
      task.id === updatedTask.id
        ? {
            ...updatedTask,
            date: formattedDate,
            priorityColor: getPriorityColor(updatedTask.priority)
          }
        : task
    ));
  };

    const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleOpenGroupTaskEditModal = (groupTask) => {
    setCurrentGroupTask(groupTask);
    setIsGroupTaskEditModalOpen(true);
  };

  const handleCloseGroupTaskEditModal = () => {
    setCurrentGroupTask(null);
    setIsGroupTaskEditModalOpen(false);
  };

  const handleEditGroupTask = (updatedGroupTask) => {
    setGroupTasks(groupTasks.map(g => g.id === updatedGroupTask.id ? updatedGroupTask : g));
  };

  const handleDeleteGroupTask = (groupTaskId) => {
    setGroupTasks(groupTasks.filter(g => g.id !== groupTaskId));
  };




    const initialGroupTasks = [
    {
      id: 1,
      title: 'Customer Journey',
      description: 'This is description of group task. It can be long',
      completed: 5,
      total: 12,
      avatars: [avatarImage1, avatarImage2],
      progressBarColor: '#FFC107',
    },
    {
      id: 2,
      title: 'Sprint Ceremony',
      description: 'This is description of group task. It can be long',
      completed: 5,
      total: 36,
      avatars: [avatarImage1, avatarImage2],
      progressBarColor: '#EF4444',
    },
  ];

  const [groupTasks, setGroupTasks] = useState(initialGroupTasks);

  // useEffect to update group task progress when tasks change
  useEffect(() => {
    const updatedGroupTasks = initialGroupTasks.map(groupTask => {
      const relevantTasks = tasks.filter(task => task.groupId === groupTask.id);
      const completedTasks = relevantTasks.filter(task => task.completed).length;
      return {
        ...groupTask,
        completed: completedTasks,
        total: relevantTasks.length
      };
    });
    setGroupTasks(updatedGroupTasks);
  }, [tasks]);


  return (
    <div className="main-content">
      <div className="main-content-body">
        <div className="left-sidebar">
          {groupTasks.map(task => (
                        <GroupTaskCard
              key={task.id}
              {...task}
              handleOpenEditModal={handleOpenGroupTaskEditModal}
              handleDeleteGoal={handleDeleteGroupTask}
            />
          ))}
        </div>
        <div className="main-area">
          <div className="content-top-row">
            <div className="page-header">
              <h1 className="page-title">👋 My Task</h1>
              <p className="page-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ToggleButtonGroup value={view} exclusive onChange={handleViewChange} sx={{ backgroundColor: '#F3F4F6', borderRadius: '8px', height: '40px', p: '4px' }}>
                <ToggleButton value="list" sx={{ borderRadius: '6px', border: 'none', textTransform: 'none', color: '#6B7280', fontWeight: 500, '&.Mui-selected': { backgroundColor: '#EF4444', color: 'white !important' }, '&.Mui-selected:hover': { backgroundColor: '#E53935' } }}><ViewListIcon sx={{ mr: 1, fontSize: '20px' }} /> List</ToggleButton>
                <ToggleButton value="calendar" sx={{ borderRadius: '6px', border: 'none', textTransform: 'none', color: '#6B7280', fontWeight: 500, '&.Mui-selected': { backgroundColor: '#EF4444', color: 'white !important' }, '&.Mui-selected:hover': { backgroundColor: '#E53935' } }}><CalendarViewMonthIcon sx={{ mr: 1, fontSize: '20px' }} /> Calendar</ToggleButton>
                <ToggleButton value="table" sx={{ borderRadius: '6px', border: 'none', textTransform: 'none', color: '#6B7280', fontWeight: 500, '&.Mui-selected': { backgroundColor: '#EF4444', color: 'white !important' }, '&.Mui-selected:hover': { backgroundColor: '#E53935' } }}><TableViewIcon sx={{ mr: 1, fontSize: '20px' }} /> Table</ToggleButton>
              </ToggleButtonGroup>
              <FormControl sx={{ minWidth: 180 }} size="small">
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ borderRadius: '8px', backgroundColor: '#F3F4F6', border: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, height: '40px' }}
                >
                  <MenuItem value="all">Display: All tasks</MenuItem>
                  <MenuItem value="highest">Highest</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="lowest">Lowest</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal} sx={{ backgroundColor: '#4F46E5', color: 'white', textTransform: 'none', fontWeight: 600, borderRadius: '99px', height: '40px', boxShadow: 'none', '&:hover': { backgroundColor: '#4338CA', boxShadow: 'none' } }}>Add new</Button>
            </Box>
          </div>
                    {view === 'list' && <ListView tasks={filteredTasks} handleEditTask={handleEditTask} handleToggleComplete={handleToggleComplete} />}
          {view === 'calendar' && <CalendarSection tasks={filteredTasks} handleOpenEditModal={handleOpenEditModal} handleDeleteTask={handleDeleteTask} handleToggleComplete={handleToggleComplete} />}
          {view === 'table' && <TableView tasks={filteredTasks} handleOpenEditModal={handleOpenEditModal} handleDeleteTask={handleDeleteTask} handleToggleComplete={handleToggleComplete} />}
        </div>
        <div className="right-sidebar">
            <AddTaskModal open={modalOpen} handleClose={handleCloseModal} handleAddTask={handleAddTask} />
            {currentTask && <EditTaskModal open={editModalOpen} handleClose={handleCloseEditModal} handleEditTask={handleEditTask} task={currentTask} handleDeleteTask={handleDeleteTask} />}
      {currentGroupTask && <EditGroupTaskModal open={isGroupTaskEditModalOpen} handleClose={handleCloseGroupTaskEditModal} handleEditGroupTask={handleEditGroupTask} groupTask={currentGroupTask} />}
          <div className="recently-tasks">
            <h2 className="section-title">Recently Task</h2>
            <div className="tasks-list">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} handleToggleComplete={handleToggleComplete} />
              ))}
            </div>
          </div>
          <ProgressCard />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
