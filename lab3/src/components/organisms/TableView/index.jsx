import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';

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

const TableView = ({ tasks }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '24px', borderRadius: '16px', boxShadow: 'none', border: '1px solid #E4E5F0' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="tasks table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, backgroundColor: '#F5F4FD' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: '#F5F4FD' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: '#F5F4FD' }}>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={task.id}>
                <TableCell>{task.date}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{getPriorityChip(task.priority)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableView;

