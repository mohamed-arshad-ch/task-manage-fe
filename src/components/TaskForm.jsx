import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import axiosInstance from '../api/axiosConfig';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const TaskForm = ({ open, handleClose, editingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status };

    try {
      if (editingTask) {
        await axiosInstance.put(`/tasks/${editingTask.id}`, taskData);
      } else {
        await axiosInstance.post('/tasks', taskData);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving task:', error);
      // Handle error appropriately
    }
  };

  const handleCancel = () => {
    handleClose();
    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {editingTask ? 'Edit Task' : 'Add Task'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            required
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCancel} color="secondary" style={{ marginRight: 10 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {editingTask ? 'Update' : 'Add'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskForm;
