// src/components/TaskItem.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Typography variant="subtitle2" color="primary">
          Status: {task.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskItem;
