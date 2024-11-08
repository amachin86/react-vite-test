import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AddTaskForm = ({ addTask }) => {
    const [taskTitle, setTaskTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            addTask(taskTitle);
            setTaskTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Nueva Tarea"
                variant="outlined"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Agregar
            </Button>
        </form>
    );
};

export default AddTaskForm;