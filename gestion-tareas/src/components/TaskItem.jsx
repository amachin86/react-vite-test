// src/components/TaskItem.jsx
import React from 'react';
import { ListItem, ListItemText, Button } from '@mui/material';

const TaskItem = ({ task, completeTask, deleteTask }) => {
    return (
        <ListItem>
            <ListItemText 
                primary={task.title} 
                sx={{ 
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'gray' : 'black' // Cambia el color según el estado
                }} 
            />
            <Button 
                onClick={() => completeTask(task.id)} 
                color="success"
                variant="contained"
                style={{ marginRight: '8px' }} // Espaciado entre botones
            >
                {task.completed ? 'Revertir' : 'Completar'}
            </Button>
            <Button 
                onClick={() => deleteTask(task.id)} 
                color="error"
                variant="contained"
            >
                Eliminar
            </Button>
        </ListItem>
    );
};

export default TaskItem;