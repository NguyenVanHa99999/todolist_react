import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Paper, Typography, Box, IconButton, Modal, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const KanbanTask = ({ task, handleDeleteTask, handleUpdateTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditedTitle(task.title); // Reset title on cancel
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      handleUpdateTask(task.id, editedTitle.trim());
      handleCloseModal();
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    marginBottom: '8px',
    position: 'relative',
  };

  return (
    <>
      <Paper
        ref={setNodeRef}
        style={style}
        elevation={1}
        sx={{
          padding: '12px 16px',
          '&:hover': {
            boxShadow: 3,
          },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* This Box is the drag handle, containing both attributes and listeners */}
        <Box {...attributes} {...listeners} sx={{ flexGrow: 1, cursor: 'grab' }}>
          <Typography variant="body2" sx={{ color: '#1B1D29' }}>
            {task.title}
          </Typography>
        </Box>

        {/* This Box contains the action buttons, now outside the drag handle's influence */}
        {isHovered && (
          <Box sx={{ display: 'flex' }}>
            <IconButton size="small" onClick={handleOpenModal} sx={{ p: '4px' }}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => handleDeleteTask(task.id)} sx={{ p: '4px' }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Paper>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Edit Task</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button variant="text" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default KanbanTask;

