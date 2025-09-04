import React, { useState, useEffect, forwardRef } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
};

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <TextField
    fullWidth
    label="Date"
    onClick={onClick}
    ref={ref}
    value={value}
    readOnly
  />
));
CustomDateInput.displayName = 'CustomDateInput';

const EditTaskModal = ({ open, handleClose, handleEditTask, task, handleDeleteTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      const taskDate = new Date(task.date.split('/').reverse().join('-'));
      setDate(taskDate);
    }
  }, [task]);

    const handleSubmit = () => {
    if (title.trim()) {
      handleEditTask({ ...task, title, priority, date });
      handleClose();
    }
  };

  const handleDelete = () => {
    handleDeleteTask(task.id);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-task-modal-title"
    >
      <Box sx={style}>
        <Typography id="edit-task-modal-title" variant="h6" component="h2">
          Edit Task
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            autoFocus
            label="Task Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="highest">Highest</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
              <MenuItem value="lowest">Lowest</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomDateInput />}
            />
          </FormControl>
        </Box>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleDelete} sx={{ mr: 'auto', color: 'red' }}>Delete</Button>
          <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;

