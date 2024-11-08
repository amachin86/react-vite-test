import React, { useState, useEffect } from 'react';
import { TextField, Button, FormHelperText } from '@mui/material';

const AddTaskForm = ({ addTask }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim() === '') {
            setError('El título de la tarea no puede estar vacío.');
            return;
        }
        addTask(taskTitle);
        setTaskTitle('');
        setError('');
        setSuccessMessage('Tarea agregada con éxito!');

       /*  // Eliminar el mensaje de éxito después de 5 segundos
         setTimeout(() => {
            setSuccessMessage('');
        }, 5000);*/
    };

    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        }
        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, [successMessage]);

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
                style={{ marginRight: '8px' }} 
            />
            <Button type="submit" variant="contained" color="primary">
                Agregar
            </Button>
            {successMessage && (
                <FormHelperText style={{ color: 'green', marginTop: '8px' }}>
                    {successMessage}
                </FormHelperText>
            )}
        </form>
    );
};

export default AddTaskForm;