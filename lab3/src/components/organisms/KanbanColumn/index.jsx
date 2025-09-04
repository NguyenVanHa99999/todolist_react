import React, { useState } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import KanbanTask from '../../molecules/KanbanTask';
import { Paper, Typography, Button, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const KanbanColumn = ({ column, tasks, handleAddTask, handleDeleteTask, handleUpdateTask }) => {
  const { setNodeRef } = useSortable({ id: column.id });
  const [isAdding, setIsAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddClick = () => setIsAdding(true);
  const handleCancel = () => {
    setIsAdding(false);
    setTaskTitle('');
  };

  const handleConfirm = () => {
    if (taskTitle.trim()) {
      handleAddTask(column.id, taskTitle);
      handleCancel();
    }
  };

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        width: 450,
        flexShrink: 0,
        backgroundColor: '#F3F4F6',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151', mb: 2, px: 1 }}>
        {column.title}
      </Typography>
      <Box sx={{ flexGrow: 1, minHeight: '100px' }}>
        <SortableContext items={tasks.map(task => task.id)}>
          {tasks.map(task => (
            <KanbanTask
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          ))}
        </SortableContext>
      </Box>
      {isAdding ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          <TextField
            placeholder="Enter a title for this card..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            autoFocus
            multiline
            variant="outlined"
            size="small"
            sx={{ backgroundColor: 'white' }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" onClick={handleConfirm} size="small">Add card</Button>
            <Button variant="text" onClick={handleCancel} size="small">Cancel</Button>
          </Box>
        </Box>
      ) : (
        <Button
          onClick={handleAddClick}
          startIcon={<AddIcon />}
          sx={{
            justifyContent: 'flex-start',
            color: '#6B7280',
            textTransform: 'none',
            fontWeight: 500,
            mt: 1,
            '&:hover': { backgroundColor: '#E5E7EB' },
          }}
        >
          Add a card
        </Button>
      )}
    </Paper>
  );
};

export default KanbanColumn;

