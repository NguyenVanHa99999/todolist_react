import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const getPriorityChip = (priority) => {
  let color;
  let label = priority.charAt(0).toUpperCase() + priority.slice(1);

  switch (priority) {
    case 'highest':
    case 'high':
      color = 'error';
      break;
    case 'medium':
      color = 'warning';
      break;
    case 'low':
      color = 'success';
      break;
    default:
      color = 'default';
  }

  return <Chip label={label} color={color} size="small" sx={{ fontWeight: 500 }} />;
};

const TaskRow = ({ task, handleOpenEditModal, handleDeleteTask, handleToggleComplete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={task.id}>
      <TableCell padding="checkbox">
        <Checkbox checked={task.completed || false} onChange={() => handleToggleComplete(task.id)} />
      </TableCell>
      <TableCell>{task.date}</TableCell>
      <TableCell>{task.title}</TableCell>
      <TableCell>{getPriorityChip(task.priority)}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleClick}>
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
      </TableCell>
    </TableRow>
  );
};

const TableView = ({ tasks, handleOpenEditModal, handleDeleteTask, handleToggleComplete }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '24px', borderRadius: '16px', boxShadow: 'none', border: '1px solid #E4E5F0' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="tasks table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ backgroundColor: '#F5F4FD' }}></TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: '#F5F4FD' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: '#F5F4FD' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 600, backgroundColor: '#F5F4FD' }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: '#F5F4FD' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                        {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                handleOpenEditModal={handleOpenEditModal}
                handleDeleteTask={handleDeleteTask}
                handleToggleComplete={handleToggleComplete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableView;

