import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const styles = {
  goalCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #E4E5F0',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'box-shadow 0.3s ease',
  },
  goalCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  goalTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1B1D29',
    margin: 0,
  },
  goalDescription: {
    fontSize: '14px',
    color: '#82869E',
    lineHeight: 1.5,
    margin: 0,
    flexGrow: 1,
  },
  goalCardFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  goalProgressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  goalProgressBarWrapper: {
    flexGrow: 1,
    height: '8px',
    backgroundColor: '#F3F4F6',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  goalProgressBar: {
    height: '100%',
    borderRadius: '4px',
  },
  goalProgressText: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#4B5563',
  },
  goalTaskInfo: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
  },
  taskCount: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1B1D29',
  },
  taskLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
};

const GoalCard = ({ goal, handleOpenEditModal, handleDeleteGoal }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleOpenEditModal(goal);
    handleClose();
  };

  const handleDelete = () => {
    handleDeleteGoal(goal.id);
    handleClose();
  };
  const { title, description, progress, tasksCompleted, totalTasks, color } = goal;

  return (
    <div style={styles.goalCard}>
      <div style={styles.goalCardHeader}>
        <h3 style={styles.goalTitle}>{title}</h3>
                <div>
          <IconButton size="small" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
      <p style={styles.goalDescription}>{description}</p>
      <div style={styles.goalCardFooter}>
        <div style={styles.goalProgressContainer}>
          <div style={styles.goalProgressBarWrapper}>
            <div style={{ ...styles.goalProgressBar, width: `${progress}%`, backgroundColor: color }}></div>
          </div>
          <span style={styles.goalProgressText}>{progress}%</span>
        </div>
        <div style={styles.goalTaskInfo}>
          <span style={styles.taskCount}>{`${tasksCompleted}/${totalTasks}`}</span>
          <span style={styles.taskLabel}>COMPLETED</span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;

