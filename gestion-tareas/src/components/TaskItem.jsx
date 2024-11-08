import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, toggleComplete, deleteTask }) => {
    return (
        <ListItem>
            <Checkbox
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
            />
            <ListItemText primary={task.title} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task.id)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
};

export default TaskItem;