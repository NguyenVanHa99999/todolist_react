import React from 'react';
import TaskCard from '../../molecules/TaskCard';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const ListView = ({ tasks, handleEditTask, handleToggleComplete }) => {
  return (
    <Paper sx={{
      width: '100%',
      marginTop: '24px',
      borderRadius: '16px',
      boxShadow: 'none',
      border: '1px solid #E4E5F0',
      padding: '24px'
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} handleEditTask={handleEditTask} handleToggleComplete={handleToggleComplete} />
        ))}
      </Box>
    </Paper>
  );
};

export default ListView;

