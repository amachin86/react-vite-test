import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Cargar tareas desde localStorage al iniciar la aplicación
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        } else {
            // Si no hay tareas almacenadas, cargar tareas de la API
            const fetchTasks = async () => {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
                const tasksWithId = response.data.map(task => ({
                    id: task.id,
                    title: task.title,
                    completed: task.completed,
                }));
                setTasks(tasksWithId);
                localStorage.setItem('tasks', JSON.stringify(tasksWithId)); // Guardar en localStorage
            };
            fetchTasks();
        }
    }, []);

    useEffect(() => {
        // Guardar tareas en localStorage cada vez que cambian
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title) => {
        const newTask = { id: Date.now(), title, completed: false };
        setTasks([...tasks, newTask]);
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gestión de Tareas
            </Typography>
            <AddTaskForm addTask={addTask} />
            <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
        </Container>
    );
};

export default App;