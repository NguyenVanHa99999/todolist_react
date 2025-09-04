import React, { useState, useEffect } from 'react';
import GoalCard from '../../organisms/GoalCard';
import AddGoalModal from '../../organisms/AddGoalModal';
import EditGoalModal from '../../organisms/EditGoalModal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './GoalsPage.css';

const sampleGoals = [
  {
    id: 1,
    title: 'Launch New Website',
    description: 'Complete the development and deployment of the new company website.',
    progress: 75,
    tasksCompleted: 15,
    totalTasks: 20,
    color: '#4F46E5',
  },
  {
    id: 2,
    title: 'Q3 Marketing Campaign',
    description: 'Plan and execute a successful marketing campaign for the third quarter.',
    progress: 40,
    tasksCompleted: 8,
    totalTasks: 20,
    color: '#F59E0B',
  },
  {
    id: 3,
    title: 'Improve Customer Support',
    description: 'Reduce the average response time for customer support tickets by 50%.',
    progress: 90,
    tasksCompleted: 18,
    totalTasks: 20,
    color: '#10B981',
  },
  {
    id: 4,
    title: 'Develop Mobile App',
    description: 'Create and launch the first version of our mobile application for iOS and Android.',
    progress: 20,
    tasksCompleted: 4,
    totalTasks: 20,
    color: '#EF4444',
  },
];

const GoalsPage = () => {
  const [goals, setGoals] = useState(() => {
    try {
      const savedGoals = localStorage.getItem('goals');
      return savedGoals ? JSON.parse(savedGoals) : sampleGoals;
    } catch (error) {
      console.error("Failed to parse goals from localStorage", error);
      return sampleGoals;
    }
  });
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('goals', JSON.stringify(goals));
    } catch (error) {
      console.error("Failed to save goals to localStorage", error);
    }
  }, [goals]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

    const handleAddGoal = (newGoal) => {
    const goalToAdd = {
      id: Date.now(),
      ...newGoal,
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 10, // Default value, can be changed later
      color: ['#4F46E5', '#F59E0B', '#10B981', '#EF4444'][Math.floor(Math.random() * 4)],
    };
    setGoals([...goals, goalToAdd]);
  };

  const handleOpenEditModal = (goal) => {
    setCurrentGoal(goal);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setCurrentGoal(null);
    setIsEditModalOpen(false);
  };

  const handleEditGoal = (updatedGoal) => {
    setGoals(goals.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal)));
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };


  return (
    <div className="goals-page">
      <div className="goals-page-header">
        <h1 className="goals-page-title">🎯 Ultimate Goals</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="add-goal-button"
          onClick={handleOpenModal}
        >
          Add New Goal
        </Button>
      </div>
      <div className="goals-grid">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} handleOpenEditModal={handleOpenEditModal} handleDeleteGoal={handleDeleteGoal} />
        ))}
      </div>
            <AddGoalModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleAddGoal={handleAddGoal}
      />
      {currentGoal && (
        <EditGoalModal
          open={isEditModalOpen}
          handleClose={handleCloseEditModal}
          handleEditGoal={handleEditGoal}
          goal={currentGoal}
        />
      )}
    </div>
  );
};

export default GoalsPage;

