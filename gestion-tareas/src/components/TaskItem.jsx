import React from 'react';
import { ListItem, ListItemText, Button } from '@mui/material';

const TaskItem = ({ task, completeTask, deleteTask }) => {
    return (
        <ListItem>
            <ListItemText 
                primary={task.title} 
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }} 
            />
            <Button onClick={() => completeTask(task.id)} color="success">
                {task.completed ? 'Revertir' : 'Completar'}
            </Button>
            <Button onClick={() => deleteTask(task.id)} color="error">
                Eliminar
            </Button>
        </ListItem>
    );
};

export default TaskItem;