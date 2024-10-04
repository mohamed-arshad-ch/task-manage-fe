
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  
  Button,
} from '@mui/material';

import Grid from '@mui/material/Grid2';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import axiosInstance from '../api/axiosConfig';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/tasks', {
        params: filter ? { status: filter } : {},
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error appropriately
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setEditingTask(null);
    setOpenForm(false);
    fetchTasks();
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Task Management
      </Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Status Filter"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
            Add Task
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskItem task={task} onDelete={handleDelete} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>

      {openForm && (
        <TaskForm
          open={openForm}
          handleClose={handleFormClose}
          editingTask={editingTask}
        />
      )}
    </Container>
  );
};

export default TaskList;
