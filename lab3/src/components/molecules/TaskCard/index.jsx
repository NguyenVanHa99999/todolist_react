import React, { useState } from 'react';
import Card from '../../atoms/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// MUI Icon Imports
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DragHandleIcon from '@mui/icons-material/DragHandle'; // Using this for medium priority
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TaskCard = ({ task, handleOpenEditModal, handleDeleteTask, handleEditTask, handleToggleComplete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleOpenEditModal(task);
    handleClose();
  };

    const handleDelete = () => {
    handleDeleteTask(task.id);
    handleClose();
  };

  const handlePriorityChange = () => {
    if (!handleEditTask) return;

        const priorities = ['lowest', 'low', 'medium', 'high', 'highest'];
    const currentPriorityIndex = priorities.indexOf(task.priority);
    const nextPriorityIndex = (currentPriorityIndex + 1) % priorities.length;
    const nextPriority = priorities[nextPriorityIndex];

    handleEditTask({ ...task, priority: nextPriority });
  };
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'highest':
        return {
          Icon: <KeyboardDoubleArrowUpIcon sx={{ fontSize: '16px' }} />,
          styles: {
            backgroundColor: '#FFE0E3',
            color: '#DA4343',
          },
        };
      case 'high':
        return {
          Icon: <ArrowUpwardIcon sx={{ fontSize: '16px' }} />,
          styles: {
            backgroundColor: '#FFE0E3',
            color: '#DA4343',
          },
        };
      case 'medium':
        return {
          Icon: <DragHandleIcon sx={{ fontSize: '16px' }} />,
          styles: {
            backgroundColor: '#FFEED9',
            color: '#FFA940',
          },
        };
            case 'low':
        return {
          Icon: <KeyboardDoubleArrowDownIcon sx={{ fontSize: '16px' }} />,
          styles: {
            backgroundColor: '#EAFAEF',
            color: '#30CD60',
          },
        };
      case 'lowest':
        return {
          Icon: <ArrowDownwardIcon sx={{ fontSize: '16px' }} />,
          styles: {
            backgroundColor: '#EAFAEF',
            color: '#30CD60',
          },
        };
      default:
        return {
          Icon: null,
          styles: {},
        };
    }
  };

  const { Icon, styles: priorityStyles } = getPriorityInfo(task.priority);

  return (
    <Card
      sx={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #F3F4F6',
        width: '100%',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.06)',
        },
        // Apply highlighted shadow for specific task ID if needed
        ...(task.id === 2 && { boxShadow: '0 10px 24px rgba(0, 0, 0, 0.06)' }),
      }}
    >
            <CardContent sx={{ p: '12px 16px !important', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Checkbox checked={task.completed || false} onChange={() => handleToggleComplete(task.id)} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            color: '#C8CDD9',
          }}
        >
          {task.date}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#1B1D29',
          }}
        >
                    {task.title}
                  </Typography>
          </Box>
        </Box>
                {handleOpenEditModal && handleDeleteTask && (
          <>
            <IconButton
              aria-label="more"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ p: 0 }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </>
        )}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </CardContent>
      {Icon && (
                <Box
          onClick={handlePriorityChange}
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            cursor: handleEditTask ? 'pointer' : 'default',
            ...priorityStyles,
          }}
        >
          {Icon}
        </Box>
      )}
    </Card>
  );
};

export default TaskCard;
