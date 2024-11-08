import React, { useState } from 'react';
import { TextField, Button, FormHelperText } from '@mui/material';

const AddTaskForm = ({ addTask }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim() === '') {
            setError('El título de la tarea no puede estar vacío.');
            return;
        }
        addTask(taskTitle);
        setTaskTitle('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Nueva Tarea"
                variant="outlined"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                error={Boolean(error)}
                helperText={error}
            />
            <Button type="submit" variant="contained" color="primary">
                Agregar
            </Button>
        </form>
    );
};

export default AddTaskForm;